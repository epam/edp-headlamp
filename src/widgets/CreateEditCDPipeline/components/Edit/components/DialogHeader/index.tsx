import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { DocLink } from '../../../../../../components/DocLink';
import { URL_EDP_HEADLAMP_USER_GUIDE_CD_PIPELINE_EDIT } from '../../../../../../constants/urls';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../../../constants';
import { CreateEditCDPipelineDialogForwardedProps } from '../../../../types';

export const DialogHeader = () => {
    const { dialogProviderState } = useDialogContext<CreateEditCDPipelineDialogForwardedProps>();
    const CDPipelineData =
        dialogProviderState?.[CREATE_EDIT_CD_PIPELINE_DIALOG_NAME].forwardedProps?.CDPipelineData;

    return (
        <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
            <Grid item>
                <Grid container spacing={1} alignItems={'center'}>
                    <Grid item>
                        <Typography
                            variant={'h5'}
                        >{`Edit ${CDPipelineData?.metadata.name}`}</Typography>
                    </Grid>
                    <Grid item>
                        <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE_CD_PIPELINE_EDIT} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
