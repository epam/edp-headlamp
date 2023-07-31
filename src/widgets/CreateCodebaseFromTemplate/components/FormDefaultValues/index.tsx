import { Grid, Link, Paper, Typography } from '@material-ui/core';
import React from 'react';
import {
    BUILD_TOOL_ICON_MAPPING,
    FRAMEWORK_ICON_MAPPING,
    LANGUAGE_ICON_MAPPING,
} from '../../../../configs/icon-mappings';
import { RESOURCE_ICON_NAMES } from '../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../icons/UseSpriteSymbol';
import { useSpecificDialogContext } from '../../../../providers/Dialog/hooks';
import { getCodebaseMappingByCodebaseType } from '../../../../utils/getCodebaseMappingByCodebaseType';
import { CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME } from '../../constants';
import { CreateCodebaseFromTemplateDialogForwardedProps } from '../../types';
import { useStyles } from './styles';

export const FormDefaultValues = () => {
    const classes = useStyles();
    const {
        forwardedProps: { template },
    } = useSpecificDialogContext<CreateCodebaseFromTemplateDialogForwardedProps>(
        CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME
    );

    const {
        spec: { type: codebaseType, language, framework, buildTool, source },
    } = template;

    const codebaseMapping = getCodebaseMappingByCodebaseType(codebaseType);

    return (
        <Paper elevation={0} className={classes.defaultValuesBoard}>
            <Grid container alignItems={'flex-start'} spacing={2}>
                <Grid item xs={2}>
                    <Typography variant={'body2'} gutterBottom>
                        Language
                    </Typography>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item>
                            <UseSpriteSymbol
                                name={
                                    LANGUAGE_ICON_MAPPING?.[language?.toLowerCase()] ||
                                    RESOURCE_ICON_NAMES.OTHER
                                }
                                width={20}
                                height={20}
                            />
                        </Grid>
                        <Grid item>{codebaseMapping?.[language]?.language?.name || language}</Grid>
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
                                    FRAMEWORK_ICON_MAPPING?.[framework?.toLowerCase()] ||
                                    RESOURCE_ICON_NAMES.OTHER
                                }
                                width={20}
                                height={20}
                            />
                        </Grid>
                        <Grid item>
                            {codebaseMapping?.[language]?.frameworks?.[framework]?.name ||
                                framework}
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
                                    BUILD_TOOL_ICON_MAPPING?.[buildTool?.toLowerCase()] ||
                                    RESOURCE_ICON_NAMES.OTHER
                                }
                                width={20}
                                height={20}
                            />
                        </Grid>
                        <Grid item>
                            {codebaseMapping?.[language]?.buildTools?.[buildTool]?.name ||
                                buildTool}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={'body2'} gutterBottom>
                        Source
                    </Typography>
                    <Link href={source} target={'_blank'}>
                        {source}
                    </Link>
                </Grid>
            </Grid>
        </Paper>
    );
};
