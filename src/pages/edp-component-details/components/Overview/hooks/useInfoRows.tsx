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
import { EDPCodebaseKubeObject } from '../../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { useGitServerByCodebaseQuery } from '../../../../../k8s/EDPGitServer/hooks/useGitServerByCodebaseQuery';
import {
  generateBuildPipelineRef,
  generateReviewPipelineRef,
} from '../../../../../k8s/PipelineRun/utils';
import { SYSTEM_QUICK_LINKS } from '../../../../../k8s/QuickLink/constants';
import { useQuickLinksURLsQuery } from '../../../../../k8s/QuickLink/hooks/useQuickLinksURLQuery';
import { LinkCreationService } from '../../../../../services/link-creation';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getCodebaseMappingByCodebaseType } from '../../../../../utils/getCodebaseMappingByCodebaseType';
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

export const useInfoRows = (component: EDPCodebaseKubeObjectInterface): InfoRow[] | null => {
  const classes = useStyles();

  const { namespace } = useParams<ComponentDetailsRouteParams>();

  const { data: QuickLinksURLS } = useQuickLinksURLsQuery(namespace);
  const tektonBaseURL = QuickLinksURLS?.[SYSTEM_QUICK_LINKS.TEKTON];

  const { data: gitServerByCodebase } = useGitServerByCodebaseQuery({
    props: { codebaseGitServer: component?.spec.gitServer },
  });

  return React.useMemo(() => {
    if (!component || !gitServerByCodebase) {
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

    const [icon, color, isRotating] = EDPCodebaseKubeObject.getStatusIcon(
      component?.status?.status
    );

    const reviewPipelineRefName = generateReviewPipelineRef({
      gitProvider: gitServerByCodebase.spec.gitProvider,
      codebaseBuildTool: component.spec.buildTool,
      codebaseFramework: component.spec.framework,
      codebaseType: component.spec.type,
    });

    const buildPipelineRefName = generateBuildPipelineRef({
      gitProvider: gitServerByCodebase.spec.gitProvider,
      codebaseBuildTool: component.spec.buildTool,
      codebaseFramework: component.spec.framework,
      codebaseType: component.spec.type,
      codebaseVersioningType: component.spec.versioning.type,
    });

    const reviewPipelineLink = LinkCreationService.tekton.createPipelineLink(
      tektonBaseURL,
      namespace,
      reviewPipelineRefName
    );

    const buildPipelineLink = LinkCreationService.tekton.createPipelineLink(
      tektonBaseURL,
      namespace,
      buildPipelineRefName
    );

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
        ...(reviewPipelineLink && !isCodebaseTypeSystem
          ? [
              {
                label: 'Review Pipeline',
                text: (
                  <Pipeline
                    pipelineLink={reviewPipelineLink}
                    pipelineName={reviewPipelineRefName}
                    namespace={namespace}
                  />
                ),
              },
            ]
          : []),
        ...(buildPipelineLink && !isCodebaseTypeSystem
          ? [
              {
                label: 'Build Pipeline',
                text: (
                  <Pipeline
                    pipelineLink={buildPipelineLink}
                    pipelineName={buildPipelineRefName}
                    namespace={namespace}
                  />
                ),
              },
            ]
          : []),
      ],
    ];
  }, [classes, component, gitServerByCodebase, namespace, tektonBaseURL]);
};
