import { Chip, Grid, Paper, Tooltip, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../components/PageWrapper';
import { Render } from '../../components/Render';
import { StatusIcon } from '../../components/StatusIcon';
import {
    BUILD_TOOL_ICON_MAPPING,
    CI_TOOL_ICON_MAPPING,
    FRAMEWORK_ICON_MAPPING,
    LANGUAGE_ICON_MAPPING,
} from '../../configs/icon-mappings';
import { CI_TOOLS } from '../../constants/ciTools';
import { CODEBASE_VERSIONING_TYPES } from '../../constants/codebaseVersioningTypes';
import { Resources } from '../../icons/sprites/Resources';
import { RESOURCE_ICON_NAMES } from '../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../icons/UseSpriteSymbol';
import { streamCodebase } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
import { getCodebaseMappingByCodebaseType } from '../../utils/getCodebaseMappingByCodebaseType';
import { rem } from '../../utils/styling/rem';
import { routeEDPComponentList } from '../edp-component-list/route';
import { CodebaseActions } from './components/CodebaseActions';
import { CodebaseBranchesList } from './components/CodebaseBranchesList';
import { CodebaseMetadataTable } from './components/CodebaseMetadataTable';
import { useStyles } from './styles';
import { EDPComponentDetailsRouteParams } from './types';

export const PageView = () => {
    const classes = useStyles();
    const { namespace, name } = useParams<EDPComponentDetailsRouteParams>();
    const [component, setComponent] = React.useState<EDPCodebaseKubeObjectInterface>(null);
    const [, setError] = React.useState<Error>(null);

    const handleStoreComponent = React.useCallback((component: EDPCodebaseKubeObjectInterface) => {
        setComponent(component);
    }, []);

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamCodebase(name, namespace, handleStoreComponent, handleError);

        return () => cancelStream();
    }, [handleError, handleStoreComponent, name, namespace]);

    const codebaseMapping = getCodebaseMappingByCodebaseType(component?.spec.type);
    const language = component?.spec.lang;
    const framework = component?.spec.framework;
    const buildTool = component?.spec.buildTool;
    const ciTool = component?.spec.ciTool;
    return (
        <PageWrapper
            breadcrumbs={[
                {
                    label: 'Components',
                    url: {
                        pathname: routeEDPComponentList.path,
                    },
                },
                {
                    label: (
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item>
                                <StatusIcon status={component?.status.status} width={15} />
                            </Grid>
                            <Grid item>{name}</Grid>
                        </Grid>
                    ),
                },
            ]}
            breadcrumbsExtraContent={
                <Render condition={!!component}>
                    <div style={{ marginBottom: rem(2) }}>
                        <Grid container alignItems={'center'} spacing={2}>
                            <Grid item>
                                <Tooltip title={'Codebase Type'}>
                                    <Chip
                                        label={component?.spec.type}
                                        className={clsx([
                                            classes.labelChip,
                                            classes.labelChipGreen,
                                        ])}
                                    />
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </div>
                </Render>
            }
            headerSlot={
                <div style={{ marginLeft: 'auto' }}>
                    <Render condition={!!component}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <CodebaseMetadataTable codebaseData={component} />
                            </Grid>
                            <Grid item>
                                <ResourceActionListContextProvider>
                                    <CodebaseActions codebase={component} />
                                </ResourceActionListContextProvider>
                            </Grid>
                        </Grid>
                    </Render>
                </div>
            }
        >
            <Render condition={!!component}>
                <>
                    <Resources />
                    <Paper elevation={0} className={classes.defaultValuesBoard}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <Typography variant={'body2'} gutterBottom>
                                            Language
                                        </Typography>
                                        <Grid container spacing={1} alignItems={'center'}>
                                            <Grid item>
                                                <UseSpriteSymbol
                                                    name={
                                                        LANGUAGE_ICON_MAPPING?.[
                                                            language?.toLowerCase()
                                                        ] || RESOURCE_ICON_NAMES.OTHER
                                                    }
                                                    width={20}
                                                    height={20}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant={'subtitle2'}>
                                                    {codebaseMapping?.[language]?.language?.name ||
                                                        language}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant={'body2'} gutterBottom>
                                            Framework
                                        </Typography>
                                        <Grid container spacing={1} alignItems={'center'}>
                                            <Grid item>
                                                <UseSpriteSymbol
                                                    name={
                                                        FRAMEWORK_ICON_MAPPING?.[
                                                            framework?.toLowerCase()
                                                        ] || RESOURCE_ICON_NAMES.OTHER
                                                    }
                                                    width={20}
                                                    height={20}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant={'subtitle2'}>
                                                    {codebaseMapping?.[language]?.frameworks?.[
                                                        framework
                                                    ]?.name || framework}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant={'body2'} gutterBottom>
                                            Build Tool
                                        </Typography>
                                        <Grid container spacing={1} alignItems={'center'}>
                                            <Grid item>
                                                <UseSpriteSymbol
                                                    name={
                                                        BUILD_TOOL_ICON_MAPPING?.[
                                                            buildTool?.toLowerCase()
                                                        ] || RESOURCE_ICON_NAMES.OTHER
                                                    }
                                                    width={20}
                                                    height={20}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant={'subtitle2'}>
                                                    {codebaseMapping?.[language]?.buildTools?.[
                                                        buildTool
                                                    ]?.name || buildTool}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant={'body2'} gutterBottom>
                                            CI Tool
                                        </Typography>
                                        <Grid container spacing={1} alignItems={'center'}>
                                            <Grid item>
                                                <UseSpriteSymbol
                                                    name={
                                                        CI_TOOL_ICON_MAPPING?.[
                                                            ciTool?.toLowerCase()
                                                        ] || RESOURCE_ICON_NAMES.OTHER
                                                    }
                                                    width={20}
                                                    height={20}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant={'subtitle2'}>
                                                    {capitalizeFirstLetter(ciTool)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Render
                                        condition={
                                            component?.spec.ciTool === CI_TOOLS.JENKINS &&
                                            !!component?.spec.jenkinsSlave
                                        }
                                    >
                                        <Grid item xs={2}>
                                            <Typography variant={'body2'} gutterBottom>
                                                Jenkins Agent
                                            </Typography>
                                            <Typography variant={'subtitle2'}>
                                                {component?.spec.jenkinsSlave}
                                            </Typography>
                                        </Grid>
                                    </Render>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <Typography variant={'body2'} gutterBottom>
                                            Versioning Type
                                        </Typography>
                                        <Typography variant={'subtitle2'}>
                                            {component?.spec.versioning.type}
                                        </Typography>
                                    </Grid>
                                    <Render
                                        condition={
                                            component?.spec.versioning.type ===
                                            CODEBASE_VERSIONING_TYPES.EDP
                                        }
                                    >
                                        <Grid item xs={2}>
                                            <Typography variant={'body2'} gutterBottom>
                                                Versioning Start From
                                            </Typography>
                                            <Typography variant={'subtitle2'}>
                                                {component?.spec.versioning.startFrom}
                                            </Typography>
                                        </Grid>
                                    </Render>
                                    <Grid item xs={2}>
                                        <Typography variant={'body2'} gutterBottom>
                                            Strategy
                                        </Typography>
                                        <Typography variant={'subtitle2'}>
                                            {component?.spec.strategy}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant={'body2'} gutterBottom>
                                            Git URL Path
                                        </Typography>
                                        <Typography variant={'subtitle2'}>
                                            {component?.spec.gitUrlPath}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant={'body2'} gutterBottom>
                                            Deployment Script
                                        </Typography>
                                        <Typography variant={'subtitle2'}>
                                            {component?.spec.deploymentScript}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ResourceActionListContextProvider>
                                <CodebaseBranchesList codebaseData={component} />
                            </ResourceActionListContextProvider>
                        </Grid>
                    </Grid>
                </>
            </Render>
        </PageWrapper>
    );
};
