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
  const {
    component: { data: component },
    pipelines: { data: pipelines },
    codebaseBranches: { data: codebaseBranches },
  } = useDynamicDataContext();

  const [expandedPanel, setExpandedPanel] = React.useState<string>(
    codebaseBranches?.length === 1 ? codebaseBranches[0].spec.branchName : null
  );

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

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
            <TableHeaderActions codebase={component} defaultBranch={codebaseBranches?.[0]} />
          </Grid>
        </Grid>
      }
    >
      {codebaseBranches.length ? (
        <>
          {codebaseBranches.map((codebaseBranchData: CodebaseBranchKubeObjectInterface) => {
            const codebaseBranch = codebaseBranchData?.jsonData;
            const branchId = codebaseBranch.spec.branchName;

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
              codebase: component,
              defaultBranch: codebaseBranches?.[0]?.jsonData,
              pipelines,
            })
          }
        />
      )}
    </Section>
  );
};
