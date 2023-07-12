import { Icon } from '@iconify/react';
import { Button, Grid, IconButton, Link, SwipeableDrawer, Typography } from '@material-ui/core';
import React from 'react';
import { MappedProperties } from '../../../../../../components/MappedProperties';
import {
    BUILD_TOOL_ICON_MAPPING,
    FRAMEWORK_ICON_MAPPING,
    LANGUAGE_ICON_MAPPING,
} from '../../../../../../configs/icon-mappings';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { RESOURCE_ICON_NAMES } from '../../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../../icons/UseSpriteSymbol';
import { getCodebaseMappingByCodebaseType } from '../../../../../../utils/getCodebaseMappingByCodebaseType';
import { rem } from '../../../../../../utils/styling/rem';
import { useStyles } from './styles';
import { BottomDrawerProps } from './types';

export const BottomDrawer = ({ activeTemplate, drawerOpen, toggleDrawer }: BottomDrawerProps) => {
    const classes = useStyles();
    const codebaseMapping = getCodebaseMappingByCodebaseType(activeTemplate?.spec.type);

    return (
        <SwipeableDrawer
            anchor={'right'}
            open={drawerOpen}
            onClose={e => toggleDrawer(e, false)}
            onOpen={e => toggleDrawer(e, true)}
            PaperProps={{ className: classes.drawerPaper }}
            ModalProps={{ BackdropProps: { invisible: true } }}
        >
            {activeTemplate ? (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={1}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                        >
                            <Grid item xs={10}>
                                <Grid container spacing={1} alignItems={'center'}>
                                    <Grid item>
                                        <img
                                            style={{ width: rem(40) }}
                                            src={`data:${activeTemplate?.spec.icon[0].mediatype};base64,${activeTemplate?.spec.icon[0].base64data}`}
                                            alt=""
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant={'h5'}>
                                            {activeTemplate?.spec.displayName}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={e => toggleDrawer(e, false)}>
                                    <Icon icon={ICONS.CROSS} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color={'primary'} variant={'contained'} size={'small'}>
                            create from template
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body2'}>
                            {activeTemplate?.spec.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems={'flex-start'} spacing={2}>
                            <Grid item xs={4}>
                                <Typography variant={'body1'} gutterBottom>
                                    Language
                                </Typography>
                                <Grid container spacing={1} alignItems={'center'}>
                                    <Grid item>
                                        <UseSpriteSymbol
                                            name={
                                                LANGUAGE_ICON_MAPPING?.[
                                                    activeTemplate?.spec.language?.toLowerCase()
                                                ] || RESOURCE_ICON_NAMES.OTHER
                                            }
                                            width={20}
                                            height={20}
                                        />
                                    </Grid>
                                    <Grid item>
                                        {codebaseMapping?.[activeTemplate?.spec.language]?.language
                                            ?.name || activeTemplate?.spec.language}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant={'body1'} gutterBottom>
                                    Framework
                                </Typography>
                                <Grid container spacing={1} alignItems={'center'}>
                                    <Grid item>
                                        <UseSpriteSymbol
                                            name={
                                                FRAMEWORK_ICON_MAPPING?.[
                                                    activeTemplate?.spec.framework?.toLowerCase()
                                                ] || RESOURCE_ICON_NAMES.OTHER
                                            }
                                            width={20}
                                            height={20}
                                        />
                                    </Grid>
                                    <Grid item>
                                        {codebaseMapping?.[activeTemplate?.spec.language]
                                            ?.frameworks?.[activeTemplate?.spec.framework]?.name ||
                                            activeTemplate?.spec.framework}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant={'body1'} gutterBottom>
                                    Build Tool
                                </Typography>
                                <Grid container spacing={1} alignItems={'center'}>
                                    <Grid item>
                                        <UseSpriteSymbol
                                            name={
                                                BUILD_TOOL_ICON_MAPPING?.[
                                                    activeTemplate?.spec.buildTool?.toLowerCase()
                                                ] || RESOURCE_ICON_NAMES.OTHER
                                            }
                                            width={20}
                                            height={20}
                                        />
                                    </Grid>
                                    <Grid item>
                                        {codebaseMapping?.[activeTemplate?.spec.language]
                                            ?.buildTools?.[activeTemplate?.spec.buildTool]?.name ||
                                            activeTemplate?.spec.buildTool}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant={'body1'} gutterBottom>
                                    Type
                                </Typography>
                                <Typography variant={'body2'}>
                                    {activeTemplate?.spec.type}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant={'body1'} gutterBottom>
                                    Category
                                </Typography>
                                <Typography variant={'body2'}>
                                    {activeTemplate?.spec.category}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant={'body1'} gutterBottom>
                                    Maturity
                                </Typography>
                                <Typography variant={'body2'}>
                                    {activeTemplate?.spec.maturity}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant={'body1'} gutterBottom>
                                    Version
                                </Typography>
                                <Typography variant={'body2'}>
                                    {activeTemplate?.spec.version}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant={'body1'} gutterBottom>
                                    Source
                                </Typography>
                                <Link href={activeTemplate?.spec.source} target={'_blank'}>
                                    {activeTemplate?.spec.source}
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant={'body1'} gutterBottom>
                                    Keywords
                                </Typography>
                                <MappedProperties
                                    properties={activeTemplate?.spec.keywords}
                                    variant={'inline'}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant={'body1'} gutterBottom>
                                    Maintainers
                                </Typography>
                                {activeTemplate?.spec.maintainers.map(maintainer => {
                                    return (
                                        <Typography gutterBottom key={maintainer.name}>
                                            <div>
                                                <Typography variant={'body2'} component={'span'}>
                                                    Name:{' '}
                                                </Typography>
                                                <Typography variant={'caption'} component={'span'}>
                                                    {maintainer.name}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography variant={'body2'} component={'span'}>
                                                    Email:{' '}
                                                </Typography>
                                                <Typography variant={'caption'} component={'span'}>
                                                    {maintainer.email}
                                                </Typography>
                                            </div>
                                        </Typography>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            ) : null}
        </SwipeableDrawer>
    );
};
