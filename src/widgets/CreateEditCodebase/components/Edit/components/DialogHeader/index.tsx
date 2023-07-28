import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { DocLink } from '../../../../../../components/DocLink';
import { CODEBASE_TYPES } from '../../../../../../constants/codebaseTypes';
import {
    URL_EDP_HEADLAMP_USER_GUIDE_APPLICATION_ADD,
    URL_EDP_HEADLAMP_USER_GUIDE_AUTOTEST_ADD,
    URL_EDP_HEADLAMP_USER_GUIDE_LIBRARY_ADD,
} from '../../../../../../constants/urls';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../../../../constants';
import { CreateEditCodebaseDialogForwardedProps } from '../../../../types';

export const DialogHeader = () => {
    const { dialogProviderState } = useDialogContext<CreateEditCodebaseDialogForwardedProps>();
    const codebaseData =
        dialogProviderState?.[CREATE_EDIT_CODEBASE_DIALOG_NAME].forwardedProps?.codebaseData;

    const docLink = React.useMemo(() => {
        switch (codebaseData?.spec.type) {
            case CODEBASE_TYPES.APPLICATION:
                return URL_EDP_HEADLAMP_USER_GUIDE_APPLICATION_ADD;
            case CODEBASE_TYPES.AUTOTEST:
                return URL_EDP_HEADLAMP_USER_GUIDE_AUTOTEST_ADD;
            case CODEBASE_TYPES.LIBRARY:
                return URL_EDP_HEADLAMP_USER_GUIDE_LIBRARY_ADD;
            default:
                return URL_EDP_HEADLAMP_USER_GUIDE_APPLICATION_ADD;
        }
    }, [codebaseData]);

    return (
        <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
            <Grid item>
                <Grid container spacing={1} alignItems={'center'}>
                    <Grid item>
                        <Typography
                            variant={'h5'}
                        >{`Edit ${codebaseData?.metadata.name}`}</Typography>
                    </Grid>
                    <Grid item>
                        <DocLink href={docLink} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
