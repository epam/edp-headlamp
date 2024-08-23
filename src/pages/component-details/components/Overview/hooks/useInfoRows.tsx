import { Chip, Grid, Tooltip, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import { InfoRow } from '../../../../../components/InfoColumns/types';
import { StatusIcon } from '../../../../../components/StatusIcon';
import {
  BUILD_TOOL_ICON_MAPPING,
  CI_TOOL_ICON_MAPPING,
  FRAMEWORK_ICON_MAPPING,
  LANGUAGE_ICON_MAPPING,
} from '../../../../../configs/icon-mappings';
import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../constants/codebaseVersioningTypes';
import { STATUS_COLOR } from '../../../../../constants/colors';
import { RESOURCE_ICON_NAMES } from '../../../../../icons/sprites/Resources/names';
import { CodebaseKubeObject } from '../../../../../k8s/groups/EDP/Codebase';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getCodebaseMappingByCodebaseType } from '../../../../../utils/getCodebaseMappingByCodebaseType';
import { useDynamicDataContext } from '../../../providers/DynamicData/hooks';
import { ComponentDetailsRouteParams } from '../../../types';
import { Pipeline } from '../../Pipeline';

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

export const useInfoRows = (): InfoRow[] | null => {
  const {
    component: { data: component },
    pipelines: { data: pipelines },
  } = useDynamicDataContext();

  const classes = useStyles();

  const { namespace } = useParams<ComponentDetailsRouteParams>();

  return React.useMemo(() => {
    if (!component) {
      return null;
    }

    const {
      spec: {
        ciTool,
        lang,
        framework,
        buildTool,
        type,
        versioning: { type: versioningType },
        strategy,
        gitUrlPath,
        deploymentScript,
        gitServer,
      },
    } = component;
    const codebaseMapping = getCodebaseMappingByCodebaseType(type);

    const [icon, color, isRotating] = CodebaseKubeObject.getStatusIcon(component?.status?.status);

    const isCodebaseTypeSystem = type === CODEBASE_TYPES.SYSTEM;

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
                        {`Status: ${component?.status?.status || 'unknown'}`}
                      </Typography>
                      {!!component?.status?.detailedMessage && (
                        <Typography
                          variant={'subtitle2'}
                          sx={{
                            mt: (t) => t.typography.pxToRem(10),
                          }}
                        >
                          {component?.status?.detailedMessage}
                        </Typography>
                      )}
                    </>
                  }
                />
              </Grid>
              <Grid item>
                <Typography variant={'body2'}>{component?.status?.status || 'unknown'}</Typography>
              </Grid>
            </Grid>
          ),
        },
        {
          label: 'Type',
          text: (
            <Tooltip title={'Codebase Type'}>
              <Chip
                label={component?.spec.type}
                className={clsx([classes.labelChip, classes.labelChipGreen])}
              />
            </Tooltip>
          ),
        },
        {
          label: 'Language',
          text: codebaseMapping?.[lang]?.language?.name || lang,
          icon: LANGUAGE_ICON_MAPPING?.[lang?.toLowerCase()] || RESOURCE_ICON_NAMES.OTHER,
        },
        {
          label: 'Framework',
          text: codebaseMapping?.[lang]?.frameworks?.[framework]?.name || framework,
          icon: FRAMEWORK_ICON_MAPPING?.[framework?.toLowerCase()] || RESOURCE_ICON_NAMES.OTHER,
        },
        {
          label: 'Build Tool',
          text: codebaseMapping?.[lang]?.buildTools?.[buildTool]?.name || buildTool,
          icon: BUILD_TOOL_ICON_MAPPING?.[buildTool?.toLowerCase()] || RESOURCE_ICON_NAMES.OTHER,
        },
        {
          label: 'CI Tool',
          text: capitalizeFirstLetter(ciTool),
          icon: CI_TOOL_ICON_MAPPING?.[ciTool?.toLowerCase()] || RESOURCE_ICON_NAMES.OTHER,
        },
      ],
      [
        {
          label: 'Versioning Type',
          text: versioningType,
        },
        ...(versioningType === CODEBASE_VERSIONING_TYPES.EDP
          ? [
              {
                label: 'Versioning Start From',
                text: component?.spec.versioning.startFrom,
              },
            ]
          : []),
        {
          label: 'Strategy',
          text: strategy,
        },
        {
          label: 'Git URL Path',
          text: gitUrlPath,
        },
        {
          label: 'Deployment Script',
          text: deploymentScript,
        },
        {
          label: 'GitServer',
          text: gitServer,
        },
      ],
      [
        ...(!isCodebaseTypeSystem && pipelines?.review
          ? [
              {
                label: 'Review Pipeline',
                text: <Pipeline pipelineName={pipelines?.review} namespace={namespace} />,
              },
            ]
          : []),
        ...(!isCodebaseTypeSystem && pipelines?.build
          ? [
              {
                label: 'Build Pipeline',
                text: <Pipeline pipelineName={pipelines?.build} namespace={namespace} />,
              },
            ]
          : []),
      ],
    ];
  }, [classes.labelChip, classes.labelChipGreen, component, namespace, pipelines]);
};
