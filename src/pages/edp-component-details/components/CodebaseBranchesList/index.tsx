import { CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { Section } from '../../../../components/Section';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { EDPCodebaseBranchKubeObject } from '../../../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { CREATE_CODEBASE_BRANCH_DIALOG_NAME } from '../../../../widgets/CreateCodebaseBranch/constants';
import { CodebaseBranch } from './components/CodebaseBranch';
import { CodebaseBranchActions } from './components/CodebaseBranchActions';
import { TableHeaderActions } from './components/TableHeaderActions';
import { CodebaseBranchesListProps } from './types';
import { isDefaultBranch } from './utils';

export const CodebaseBranchesList = ({ codebaseData }: CodebaseBranchesListProps) => {
  const { setDialog } = useDialogContext();

  const {
    metadata: { name, namespace },
    spec: { defaultBranch },
  } = codebaseData;

  const [currentCodebaseBranches, setCurrentCodebaseBranches] =
    React.useState<EDPCodebaseBranchKubeObjectInterface[]>(null);
  const [, setError] = React.useState<Error>(null);
  const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  const handleStoreCodebaseBranches = React.useCallback(
    (data: EDPCodebaseBranchKubeObjectInterface[]) => {
      const sortedCodebaseBranches = data.sort((a) => (isDefaultBranch(codebaseData, a) ? -1 : 1));
      setCurrentCodebaseBranches(sortedCodebaseBranches);

      if (sortedCodebaseBranches.length === 1) {
        setExpandedPanel(`${sortedCodebaseBranches[0].spec.branchName}:0`);
      }
    },
    [setCurrentCodebaseBranches, codebaseData]
  );

  const handleError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    const cancelStream = EDPCodebaseBranchKubeObject.streamListByCodebaseLabel(
      name,
      handleStoreCodebaseBranches,
      handleError,
      namespace
    );

    return () => cancelStream();
  }, [name, namespace, handleStoreCodebaseBranches, handleError]);

  return (
    <Section
      title={
        <Grid container alignItems={'center'} spacing={1}>
          <Grid item>
            <Typography variant={'h1'}>
              Branches <LearnMoreLink url={EDP_USER_GUIDE.BRANCHES_MANAGE.url} />
            </Typography>
          </Grid>
          <Grid item style={{ marginLeft: 'auto' }}>
            <TableHeaderActions
              codebase={codebaseData}
              defaultBranch={currentCodebaseBranches?.[0]}
            />
          </Grid>
        </Grid>
      }
    >
      {currentCodebaseBranches === null ? (
        <Grid container justifyContent={'center'} alignItems={'center'}>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : currentCodebaseBranches.length ? (
        <>
          <CodebaseBranchActions defaultBranch={defaultBranch} codebaseData={codebaseData} />
          {currentCodebaseBranches.map(
            (codebaseBranchData: EDPCodebaseBranchKubeObjectInterface, idx: number) => {
              const branchId = `${codebaseBranchData.spec.branchName}:${idx}`;

              return (
                <CodebaseBranch
                  key={branchId}
                  id={branchId}
                  codebaseBranchData={codebaseBranchData}
                  expandedPanel={expandedPanel}
                  codebaseData={codebaseData}
                  handlePanelChange={handleChange}
                />
              );
            }
          )}
        </>
      ) : (
        <EmptyList
          missingItemName={'branches'}
          handleClick={() =>
            setDialog({
              modalName: CREATE_CODEBASE_BRANCH_DIALOG_NAME,
              forwardedProps: {
                codebase: codebaseData,
              },
            })
          }
        />
      )}
    </Section>
  );
};
