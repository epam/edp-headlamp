import { Grid, Typography } from '@mui/material';
import React from 'react';
import { DocLink } from '../../../../components/DocLink';
import { EmptyList } from '../../../../components/EmptyList';
import { Section } from '../../../../components/Section';
import { Table } from '../../../../components/Table';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../widgets/CreateEditStage/constants';
import { CreateEditStageDialogForwardedProps } from '../../../../widgets/CreateEditStage/types';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { TableHeaderActions } from '../TableHeaderActions';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';

export const StageList = () => {
  const classes = useStyles();
  const columns = useColumns(classes);
  const { stages, CDPipeline, enrichedApplications } = useDynamicDataContext();

  const { setDialog } = useDialogContext();

  const createEditStageDialogForwardedProps: CreateEditStageDialogForwardedProps = React.useMemo(
    () => ({
      mode: FORM_MODES.CREATE,
      ciTool: enrichedApplications?.[0]?.application.spec.ciTool,
      otherStages: stages,
      CDPipelineData: CDPipeline,
    }),
    [CDPipeline, enrichedApplications, stages]
  );

  return (
    <Section
      title={
        <Grid container alignItems={'center'} spacing={1}>
          <Grid item>
            <Typography variant={'h1'}>Stages</Typography>
          </Grid>
          <Grid item>
            <DocLink href={EDP_USER_GUIDE.BRANCHES_MANAGE.url} />
          </Grid>
          <Grid item style={{ marginLeft: 'auto' }}>
            <TableHeaderActions CDPipelineStages={stages} />
          </Grid>
        </Grid>
      }
    >
      <Table
        columns={columns}
        data={stages}
        isLoading={!stages}
        emptyListComponent={
          <EmptyList
            missingItemName={'stages'}
            handleClick={() => {
              setDialog({
                modalName: CREATE_EDIT_STAGE_DIALOG_NAME,
                forwardedProps: createEditStageDialogForwardedProps,
              });
            }}
          />
        }
      />
    </Section>
  );
};
