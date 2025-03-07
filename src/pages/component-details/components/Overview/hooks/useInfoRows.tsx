import { Chip, Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { InfoRow } from '../../../../../components/InfoColumns/types';
import { LoadingWrapper } from '../../../../../components/LoadingWrapper';
import { StatusIcon } from '../../../../../components/StatusIcon';
import {
  BUILD_TOOL_ICON_MAPPING,
  CI_TOOL_ICON_MAPPING,
  FRAMEWORK_ICON_MAPPING,
  LANGUAGE_ICON_MAPPING,
} from '../../../../../configs/icon-mappings';
import { CODEBASE_TYPE } from '../../../../../constants/codebaseTypes';
import { CODEBASE_VERSIONING_TYPE } from '../../../../../constants/codebaseVersioningTypes';
import { MAIN_COLOR } from '../../../../../constants/colors';
import { RESOURCE_ICON_NAMES } from '../../../../../icons/sprites/Resources/names';
import { CodebaseKubeObject } from '../../../../../k8s/groups/EDP/Codebase';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getCodebaseMappingByCodebaseType } from '../../../../../utils/getCodebaseMappingByCodebaseType';
import { Pipeline } from '../../../../../widgets/Pipeline';
import { useDynamicDataContext } from '../../../providers/DynamicData/hooks';
import { ComponentDetailsRouteParams } from '../../../types';

const getColorByType = (type: string) => {
  switch (type) {
    case CODEBASE_TYPE.SYSTEM:
      return MAIN_COLOR.GREY;
    case CODEBASE_TYPE.INFRASTRUCTURE:
      return MAIN_COLOR.DARK_PURPLE;
    case CODEBASE_TYPE.APPLICATION:
      return MAIN_COLOR.GREEN;
    case CODEBASE_TYPE.AUTOTEST:
      return MAIN_COLOR.ORANGE;
    case CODEBASE_TYPE.LIBRARY:
      return MAIN_COLOR.BLUE;
    default:
      return MAIN_COLOR.GREY;
  }
};

const getChipSX = (type: string) => {
  const color = getColorByType(type);

  return {
    color: (t) => t.palette.common.white,
    backgroundColor: color,
    borderColor: 'transparent',
  };
};

export const useInfoRows = (): InfoRow[] | null => {
  const {
    component: { data: component },
    pipelines: { data: pipelines, isLoading: pipelinesIsLoading },
  } = useDynamicDataContext();

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
                sx={getChipSX(type)}
                size="small"
                variant="outlined"
                label={capitalizeFirstLetter(type)}
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
        ...(versioningType === CODEBASE_VERSIONING_TYPE.EDP ||
        versioningType === CODEBASE_VERSIONING_TYPE.SEMVER
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
        {
          label: 'Review Pipeline',
          text: (
            <LoadingWrapper isLoading={pipelinesIsLoading}>
              <Pipeline pipelineName={pipelines?.review} namespace={namespace} />
            </LoadingWrapper>
          ),
        },
        {
          label: 'Build Pipeline',
          text: (
            <LoadingWrapper isLoading={pipelinesIsLoading}>
              <Pipeline pipelineName={pipelines?.build} namespace={namespace} />
            </LoadingWrapper>
          ),
        },
      ],
    ];
  }, [component, namespace, pipelines?.build, pipelines?.review, pipelinesIsLoading]);
};
