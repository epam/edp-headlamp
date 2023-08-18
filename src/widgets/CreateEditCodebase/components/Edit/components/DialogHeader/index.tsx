import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { DocLink } from '../../../../../../components/DocLink';
import { CODEBASE_TYPES } from '../../../../../../constants/codebaseTypes';
import { EDP_USER_GUIDE } from '../../../../../../constants/urls';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../../../../constants';
import { CreateEditCodebaseDialogForwardedProps } from '../../../../types';

export const DialogHeader = () => {
    const {
        forwardedProps: { codebaseData },
    } = useSpecificDialogContext<CreateEditCodebaseDialogForwardedProps>(
        CREATE_EDIT_CODEBASE_DIALOG_NAME
    );

    const docLink = React.useMemo(() => {
        switch (codebaseData?.spec.type) {
            case CODEBASE_TYPES.APPLICATION:
                return EDP_USER_GUIDE.APPLICATION_CREATE.url;
            case CODEBASE_TYPES.AUTOTEST:
                return EDP_USER_GUIDE.AUTOTEST_CREATE.url;
            case CODEBASE_TYPES.LIBRARY:
                return EDP_USER_GUIDE.LIBRARY_CREATE.url;
            case CODEBASE_TYPES.INFRASTRUCTURE:
                return EDP_USER_GUIDE.INFRASTRUCTURE_CREATE.url;
            default:
                return EDP_USER_GUIDE.APPLICATION_CREATE.url;
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
