import { Icon } from '@iconify/react';
import { Chip, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';
import { StatusIcon } from '../../../components/StatusIcon';
import { STATUS_COLOR } from '../../../constants/colors';
import { TRIGGER_TYPE } from '../../../constants/triggerTypes';
import { ICONS } from '../../../icons/iconify-icons-mapping';
import { StageKubeObject } from '../../../k8s/groups/EDP/Stage';
import { rem } from '../../../utils/styling/rem';
import { Pipeline } from '../../../widgets/Pipeline';
import { useDynamicDataContext } from '../providers/DynamicData/hooks';

const useStyles = makeStyles((theme) => ({
  labelChip: {
    height: theme.typography.pxToRem(24),
    lineHeight: 1,
    paddingTop: theme.typography.pxToRem(2),
  },
  labelChipBlue: {
    backgroundColor: STATUS_COLOR.SUCCESS,
    color: '#fff',
  },
  labelChipGreen: {
    backgroundColor: STATUS_COLOR.SUCCESS,
    color: '#fff',
  },
}));

export const useInfoColumns = () => {
  const {
    stage: { data: stage, isLoading },
  } = useDynamicDataContext();

  const classes = useStyles();

  return React.useMemo(() => {
    if (isLoading || !stage) {
      return [];
    }
    const [icon, color, isRotating] = StageKubeObject.getStatusIcon(stage!.status?.status);

    return [
      [
        {
          label: 'Status',
          text: (
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <StatusIcon
                  icon={icon}
                  color={color}
                  isRotating={isRotating}
                  width={20}
                  Title={
                    <>
                      <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                        {`Status: ${stage.status?.status || 'unknown'}`}
                      </Typography>
                      {!!stage.status?.detailed_message && (
                        <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                          {stage.status?.detailed_message}
                        </Typography>
                      )}
                    </>
                  }
                />
              </Grid>
              <Grid item>
                <Typography variant={'body2'}>{stage.status?.status || 'unknown'}</Typography>
              </Grid>
            </Grid>
          ),
        },
        {
          label: 'Trigger Type',
          text:
            stage.spec.triggerType === TRIGGER_TYPE.MANUAL ? (
              <Chip label="manual" className={clsx([classes.labelChip, classes.labelChipBlue])} />
            ) : (
              <Chip label="auto" className={clsx([classes.labelChip, classes.labelChipGreen])} />
            ),
        },
        {
          label: 'Cluster',
          text: (
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <Icon icon={ICONS.KUBERNETES} width={20} height={20} />
              </Grid>
              <Grid item>{stage.spec.clusterName}</Grid>
            </Grid>
          ),
        },
        {
          label: 'Namespace',
          text: stage.spec.namespace,
        },
        {
          label: 'Deploy Pipeline',
          text: stage.spec?.triggerTemplate && (
            <Pipeline
              pipelineName={stage.spec.triggerTemplate}
              namespace={stage.metadata.namespace!}
            />
          ),
        },
        {
          label: 'Clean Pipeline',
          text: stage.spec?.cleanTemplate && (
            <Pipeline
              pipelineName={stage.spec.cleanTemplate}
              namespace={stage.metadata.namespace!}
            />
          ),
        },
        {
          label: 'Description',
          text: stage.spec.description,
          columnXs: 6,
        },
      ],
    ];
  }, [classes, isLoading, stage]);
};
