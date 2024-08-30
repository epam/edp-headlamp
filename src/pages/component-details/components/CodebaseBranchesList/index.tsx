import { CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { Section } from '../../../../components/Section';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { CodebaseBranchKubeObject } from '../../../../k8s/groups/EDP/CodebaseBranch';
import { CodebaseBranchKubeObjectInterface } from '../../../../k8s/groups/EDP/CodebaseBranch/types';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { ManageCodebaseBranchDialog } from '../../../../widgets/dialogs/ManageCodebaseBranch';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { CodebaseBranch } from './components/CodebaseBranch';
import { TableHeaderActions } from './components/TableHeaderActions';
import { isDefaultBranch } from './utils';

export const CodebaseBranchesList = () => {
  const { setDialog } = useDialogContext();
  const {
    component: { data: component },
    pipelines: { data: pipelines },
  } = useDynamicDataContext();

  const {
    metadata: { name, namespace },
  } = component;

  const [currentCodebaseBranches, setCurrentCodebaseBranches] =
    React.useState<CodebaseBranchKubeObjectInterface[]>(null);
  const [, setError] = React.useState<Error>(null);
  const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  const handleStoreCodebaseBranches = React.useCallback(
    (data: CodebaseBranchKubeObjectInterface[]) => {
      const sortedCodebaseBranches = data.sort((a) => (isDefaultBranch(component, a) ? -1 : 1));
      setCurrentCodebaseBranches(sortedCodebaseBranches);

      if (sortedCodebaseBranches.length === 1) {
        setExpandedPanel(sortedCodebaseBranches[0].spec.branchName);
      } else {
        setExpandedPanel(null);
      }
    },
    [setCurrentCodebaseBranches, component]
  );

  const handleError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    const cancelStream = CodebaseBranchKubeObject.streamListByCodebaseLabel(
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
            <TableHeaderActions codebase={component} defaultBranch={currentCodebaseBranches?.[0]} />
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
          {currentCodebaseBranches.map((codebaseBranchData: CodebaseBranchKubeObjectInterface) => {
            const branchId = codebaseBranchData.spec.branchName;

            return (
              <CodebaseBranch
                key={branchId}
                id={branchId}
                codebaseBranchData={codebaseBranchData}
                expandedPanel={expandedPanel}
                codebaseData={component}
                handlePanelChange={handleChange}
                defaultBranch={currentCodebaseBranches?.[0]}
                pipelines={pipelines}
              />
            );
          })}
        </>
      ) : (
        <EmptyList
          missingItemName={'branches'}
          handleClick={() =>
            setDialog(ManageCodebaseBranchDialog, {
              codebase: component,
              defaultBranch: currentCodebaseBranches?.[0],
              pipelines,
            })
          }
        />
      )}
    </Section>
  );
};
