import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { DocLink } from '../../../../../../components/DocLink';
import { URL_EDP_HEADLAMP_USER_GUIDE_STAGE_EDIT } from '../../../../../../constants/urls';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../constants';
import { CreateEditStageDialogForwardedProps } from '../../../../types';

export const DialogHeader = () => {
    const {
        forwardedProps: { stage },
    } = useSpecificDialogContext<CreateEditStageDialogForwardedProps>(
        CREATE_EDIT_STAGE_DIALOG_NAME
    );

    return (
        <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
            <Grid item>
                <Grid container spacing={1} alignItems={'center'}>
                    <Grid item>
                        <Typography variant={'h5'}>{`Edit ${stage?.metadata.name}`}</Typography>
                    </Grid>
                    <Grid item>
                        <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE_STAGE_EDIT} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
