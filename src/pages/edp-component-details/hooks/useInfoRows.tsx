import { Chip, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { InfoRow } from '../../../components/InfoColumns/types';
import { StatusIcon } from '../../../components/StatusIcon';
import {
    BUILD_TOOL_ICON_MAPPING,
    CI_TOOL_ICON_MAPPING,
    FRAMEWORK_ICON_MAPPING,
    LANGUAGE_ICON_MAPPING,
} from '../../../configs/icon-mappings';
import { CODEBASE_VERSIONING_TYPES } from '../../../constants/codebaseVersioningTypes';
import { RESOURCE_ICON_NAMES } from '../../../icons/sprites/Resources/names';
import { EDPCodebaseKubeObject } from '../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { capitalizeFirstLetter } from '../../../utils/format/capitalizeFirstLetter';
import { getCodebaseMappingByCodebaseType } from '../../../utils/getCodebaseMappingByCodebaseType';
import { rem } from '../../../utils/styling/rem';

const useStyles = makeStyles(() => ({
    labelChip: {
        height: rem(20),
        lineHeight: 1,
        paddingTop: rem(2),
    },
    labelChipBlue: {
        backgroundColor: '#cbe1f9',
        color: '#1261af',
    },
    labelChipGreen: {
        backgroundColor: '#c3e6cd',
        color: '#2f6f45',
    },
}));

export const useInfoRows = (component: EDPCodebaseKubeObjectInterface): InfoRow[] | null => {
    const classes = useStyles();

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
            },
        } = component;
        const codebaseMapping = getCodebaseMappingByCodebaseType(type);

        const [icon, color, isRotating] = EDPCodebaseKubeObject.getStatusIcon(
            component?.status?.status
        );

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
                                            <Typography
                                                variant={'subtitle2'}
                                                style={{ fontWeight: 600 }}
                                            >
                                                {`Status: ${
                                                    component?.status?.status || 'unknown'
                                                }`}
                                            </Typography>
                                            {!!component?.status?.detailedMessage && (
                                                <Typography
                                                    variant={'subtitle2'}
                                                    style={{ marginTop: rem(10) }}
                                                >
                                                    {component?.status?.detailedMessage}
                                                </Typography>
                                            )}
                                        </>
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant={'body2'}>
                                    {component?.status?.status || 'unknown'}
                                </Typography>
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
                    icon:
                        FRAMEWORK_ICON_MAPPING?.[framework?.toLowerCase()] ||
                        RESOURCE_ICON_NAMES.OTHER,
                },
                {
                    label: 'Build Tool',
                    text: codebaseMapping?.[lang]?.buildTools?.[buildTool]?.name || buildTool,
                    icon:
                        BUILD_TOOL_ICON_MAPPING?.[buildTool?.toLowerCase()] ||
                        RESOURCE_ICON_NAMES.OTHER,
                },
                {
                    label: 'CI Tool',
                    text: capitalizeFirstLetter(ciTool),
                    icon:
                        CI_TOOL_ICON_MAPPING?.[ciTool?.toLowerCase()] || RESOURCE_ICON_NAMES.OTHER,
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
            ],
        ];
    }, [classes, component]);
};
