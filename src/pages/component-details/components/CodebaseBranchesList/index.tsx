import { Grid, Typography } from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { Section } from '../../../../components/Section';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { CodebaseBranchKubeObjectInterface } from '../../../../k8s/groups/EDP/CodebaseBranch/types';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { ManageCodebaseBranchDialog } from '../../../../widgets/dialogs/ManageCodebaseBranch';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { CodebaseBranch } from './components/CodebaseBranch';
import { TableHeaderActions } from './components/TableHeaderActions';

export const CodebaseBranchesList = () => {
  const { setDialog } = useDialogContext();
  const { component, pipelines, codebaseBranches } = useDynamicDataContext();

  const [expandedPanel, setExpandedPanel] = React.useState<string | null>(
    codebaseBranches.data?.length === 1 ? codebaseBranches.data[0].spec.branchName : null
  );

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  //@ts-ignore
  const defaultBranch = codebaseBranches.data?.[0]?.jsonData ?? codebaseBranches.data?.[0];

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
            <TableHeaderActions codebase={component.data!} defaultBranch={defaultBranch} />
          </Grid>
        </Grid>
      }
    >
      {codebaseBranches.data && codebaseBranches.data.length ? (
        <>
          {codebaseBranches.data.map((codebaseBranchData: CodebaseBranchKubeObjectInterface) => {
            // @ts-ignore
            const codebaseBranch = codebaseBranchData?.jsonData;
            const branchId = codebaseBranch.metadata.name;

            return (
              <CodebaseBranch
                key={branchId}
                id={branchId}
                codebaseBranchData={codebaseBranch}
                expandedPanel={expandedPanel}
                handlePanelChange={handleChange}
              />
            );
          })}
        </>
      ) : (
        <EmptyList
          missingItemName={'branches'}
          handleClick={() =>
            setDialog(ManageCodebaseBranchDialog, {
              codebaseBranches: codebaseBranches.data!,
              codebase: component.data!,
              defaultBranch,
              pipelines: pipelines.data,
            })
          }
        />
      )}
    </Section>
  );
};
