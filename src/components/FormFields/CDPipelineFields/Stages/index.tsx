import { Icon } from '@iconify/react';
import { Button, Grid, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../../../constants/icons';
import { Render } from '../../../Render';
import { StagesProps } from './types';

export const Stages = ({ stages, setCreateStageDialogOpen, onStageDelete }: StagesProps) => {
    const theme: DefaultTheme = useTheme();

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant={'h6'}>Stages</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1} alignItems={'center'}>
                    <Render condition={!!stages.length}>
                        <>
                            {stages.map(({ spec: { name } }, idx) => {
                                const key = `stage::${name}::${idx}`;

                                return (
                                    <React.Fragment key={key}>
                                        <Grid item xs={11}>
                                            <Typography>{name}</Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Button
                                                type={'button'}
                                                size={'small'}
                                                component={'button'}
                                                style={{ minWidth: 0 }}
                                                onClick={() => onStageDelete(idx)}
                                            >
                                                <Icon
                                                    icon={ICONS['BUCKET']}
                                                    width={20}
                                                    color={theme.palette.grey['500']}
                                                />
                                            </Button>
                                        </Grid>
                                    </React.Fragment>
                                );
                            })}
                        </>
                    </Render>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button
                    type={'button'}
                    size={'small'}
                    component={'button'}
                    style={{ minWidth: 0 }}
                    variant={'contained'}
                    color={'default'}
                    onClick={() => setCreateStageDialogOpen(true)}
                >
                    add stage
                </Button>
            </Grid>
        </Grid>
    );
};
