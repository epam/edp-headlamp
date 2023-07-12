import {
    Card,
    CardContent,
    Chip,
    FormControlLabel,
    Grid,
    Radio,
    Tooltip,
    Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import {
    BUILD_TOOL_ICON_MAPPING,
    FRAMEWORK_ICON_MAPPING,
    LANGUAGE_ICON_MAPPING,
} from '../../../../../../configs/icon-mappings';
import { RESOURCE_ICON_NAMES } from '../../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../../icons/UseSpriteSymbol';
import { getCodebaseMappingByCodebaseType } from '../../../../../../utils/getCodebaseMappingByCodebaseType';
import { rem } from '../../../../../../utils/styling/rem';
import { useStyles } from './styles';
import { TemplateCardProps } from './types';

export const TemplateCard = ({
    activeTemplate,
    template,
    handleTemplateClick,
}: TemplateCardProps) => {
    const {
        spec: {
            displayName,
            icon,
            description,
            language,
            framework,
            buildTool,
            type,
            category,
            maturity,
            version,
        },
        metadata: { name },
    } = template;
    const classes = useStyles();
    const codebaseMapping = getCodebaseMappingByCodebaseType(type);

    console.log(activeTemplate);

    const isChecked = activeTemplate && activeTemplate.metadata.name === name;

    return (
        <FormControlLabel
            control={
                <Radio
                    onChange={event => handleTemplateClick(event, template)}
                    checked={isChecked}
                    style={{ display: 'none' }}
                />
            }
            label={
                <Card
                    className={clsx(classes.cardRoot, {
                        [classes.cardRootActive]: isChecked,
                    })}
                >
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Grid container spacing={1} alignItems={'center'}>
                                    <Grid item>
                                        <img
                                            style={{ width: rem(40) }}
                                            src={`data:${icon[0].mediatype};base64,${icon[0].base64data}`}
                                            alt=""
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant={'h5'}>{displayName}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems={'center'} spacing={1}>
                                    <Grid item>
                                        <Tooltip title={'Language'}>
                                            <Chip
                                                size="small"
                                                avatar={
                                                    <UseSpriteSymbol
                                                        name={
                                                            LANGUAGE_ICON_MAPPING?.[language] ||
                                                            RESOURCE_ICON_NAMES.OTHER
                                                        }
                                                        width={15}
                                                        height={15}
                                                    />
                                                }
                                                label={
                                                    codebaseMapping?.[language]?.language?.name ||
                                                    language
                                                }
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title={'Framework'}>
                                            <Chip
                                                size="small"
                                                avatar={
                                                    <UseSpriteSymbol
                                                        name={
                                                            FRAMEWORK_ICON_MAPPING?.[framework] ||
                                                            RESOURCE_ICON_NAMES.OTHER
                                                        }
                                                        width={15}
                                                        height={15}
                                                    />
                                                }
                                                label={
                                                    codebaseMapping?.[language]?.frameworks?.[
                                                        framework
                                                    ]?.name || framework
                                                }
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title={'Build Tool'}>
                                            <Chip
                                                size="small"
                                                avatar={
                                                    <UseSpriteSymbol
                                                        name={
                                                            BUILD_TOOL_ICON_MAPPING?.[buildTool] ||
                                                            RESOURCE_ICON_NAMES.OTHER
                                                        }
                                                        width={15}
                                                        height={15}
                                                    />
                                                }
                                                label={
                                                    codebaseMapping?.[language]?.buildTools?.[
                                                        buildTool
                                                    ]?.name || buildTool
                                                }
                                            />
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant={'caption'}>{description}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1} alignItems={'center'}>
                                    <Grid item>
                                        <Tooltip title={'Type'}>
                                            <Chip
                                                size={'small'}
                                                label={type}
                                                color={'primary'}
                                                variant={'outlined'}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title={'Category'}>
                                            <Chip
                                                size={'small'}
                                                label={category}
                                                color={'primary'}
                                                variant={'outlined'}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title={'Maturity'}>
                                            <Chip
                                                size={'small'}
                                                label={maturity}
                                                color={'primary'}
                                                variant={'outlined'}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title={'Version'}>
                                            <Chip
                                                size={'small'}
                                                label={version}
                                                color={'primary'}
                                                variant={'outlined'}
                                            />
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            }
        />
    );
};
