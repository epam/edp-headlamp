import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Render } from '../../components/Render';
import { CRUD_TYPES } from '../../constants/crudTypes';
import { useSpecificDialogContext } from '../../providers/Dialog/hooks';
import { rem } from '../../utils/styling/rem';
import { CONFIRM_RESOURCES_UPDATES_DIALOG_NAME } from './constants';
import { ConfirmResourcesUpdatesDialogForwardedProps } from './types';

export const ConfirmResourcesUpdates = () => {
    const {
        open,
        forwardedProps: { deleteCallback, customText, resourcesArray },
        closeDialog,
    } = useSpecificDialogContext<ConfirmResourcesUpdatesDialogForwardedProps>(
        CONFIRM_RESOURCES_UPDATES_DIALOG_NAME
    );
    const { register, watch, reset } = useForm();

    const confirmFieldValue = watch('confirm');
    const isSubmitNotAllowed = confirmFieldValue !== 'confirm';

    const handleClosePopup = React.useCallback(() => closeDialog(), [closeDialog]);

    const onSubmit = React.useCallback(async () => {
        await deleteCallback();
        handleClosePopup();
        reset();
    }, [deleteCallback, handleClosePopup, reset]);

    return (
        <Dialog open={open} onClose={handleClosePopup} fullWidth data-testid="dialog">
            <DialogTitle>Confirm action</DialogTitle>
            <DialogContent>
                <div style={{ marginBottom: rem(40) }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>
                                Are you sure you want to update resources below?
                            </Typography>
                            <Render condition={!!customText}>
                                <Typography variant={'subtitle1'}>{customText}</Typography>
                            </Render>
                        </Grid>
                        <Grid item xs={12}>
                            <Render condition={!!resourcesArray}>
                                <Grid container spacing={1}>
                                    {resourcesArray.map(({ name, kind, actionType }) => {
                                        return (
                                            <Grid item xs={12} key={name}>
                                                <Typography
                                                    variant={'body2'}
                                                    component={'span'}
                                                    style={{
                                                        fontStyle: 'italic',
                                                        marginRight: '5px',
                                                    }}
                                                >
                                                    {kind}
                                                </Typography>
                                                <Typography
                                                    variant={'body2'}
                                                    component={'span'}
                                                    style={{
                                                        fontWeight: 'bold',
                                                        marginRight: '5px',
                                                    }}
                                                >
                                                    {name}
                                                </Typography>
                                                <Typography variant={'body2'} component={'span'}>
                                                    will be{' '}
                                                    {actionType === CRUD_TYPES.EDIT
                                                        ? 'updated'
                                                        : CRUD_TYPES.DELETE
                                                        ? 'deleted'
                                                        : CRUD_TYPES.CREATE
                                                        ? 'created'
                                                        : ''}
                                                </Typography>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Render>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('confirm', { required: true })}
                                label={'Enter "confirm" to confirm action'}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions>
                <Button type={'button'} onClick={handleClosePopup}>
                    Cancel
                </Button>
                <Button onClick={onSubmit} disabled={isSubmitNotAllowed}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};
