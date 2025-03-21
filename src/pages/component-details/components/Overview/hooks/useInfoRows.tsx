import { Chip, Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { InfoRow } from '../../../../../components/InfoColumns/types';
import { LoadingWrapper } from '../../../../../components/LoadingWrapper';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { CodebaseInterface } from '../../../../../configs/codebase-mappings/types';
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
    color: (t: DefaultTheme) => t.palette.common.white,
    backgroundColor: color,
    borderColor: 'transparent',
  };
};

export const useInfoRows = () => {
  const {
    component: { data: component },
    pipelines: { data: pipelines, isLoading: pipelinesIsLoading },
  } = useDynamicDataContext();

  const { namespace } = useParams<ComponentDetailsRouteParams>();

  return React.useMemo((): InfoRow[] | null => {
    if (!component) {
      return null;
    }

    const {
      spec: {
        ciTool,
        lang: _lang,
        framework: _framework,
        buildTool: _buildTool,
        type,
        versioning: { type: versioningType },
        strategy,
        gitUrlPath,
        deploymentScript,
        gitServer,
      },
    } = component;
    const codebaseMapping = getCodebaseMappingByCodebaseType(type) as Record<
      string,
      CodebaseInterface
    >;

    const [icon, color, isRotating] = CodebaseKubeObject.getStatusIcon(component?.status?.status);

    const lang = _lang.toLowerCase();
    const framework = _framework?.toLowerCase();
    const buildTool = _buildTool.toLowerCase();

    const codebaseMappingByLang = codebaseMapping?.[lang];

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
          text: codebaseMappingByLang?.language?.name || _lang,
          icon:
            LANGUAGE_ICON_MAPPING?.[lang as keyof typeof LANGUAGE_ICON_MAPPING] ||
            RESOURCE_ICON_NAMES.OTHER,
        },
        {
          label: 'Framework',
          text: framework
            ? codebaseMappingByLang?.frameworks?.[framework]?.name || _framework || 'N/A'
            : 'N/A',
          icon:
            FRAMEWORK_ICON_MAPPING?.[framework as keyof typeof FRAMEWORK_ICON_MAPPING] ||
            RESOURCE_ICON_NAMES.OTHER,
        },
        {
          label: 'Build Tool',
          text: codebaseMappingByLang?.buildTools?.[buildTool]?.name || _buildTool,
          icon:
            BUILD_TOOL_ICON_MAPPING?.[buildTool as keyof typeof BUILD_TOOL_ICON_MAPPING] ||
            RESOURCE_ICON_NAMES.OTHER,
        },
        {
          label: 'CI Tool',
          text: capitalizeFirstLetter(ciTool),
          icon:
            CI_TOOL_ICON_MAPPING?.[ciTool as keyof typeof CI_TOOL_ICON_MAPPING] ||
            RESOURCE_ICON_NAMES.OTHER,
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
                text: component?.spec.versioning.startFrom || 'N/A',
              },
            ]
          : []),
        {
          label: 'Strategy',
          text: strategy,
        },
        {
          label: 'Git URL Path',
          text: gitUrlPath || 'N/A',
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
