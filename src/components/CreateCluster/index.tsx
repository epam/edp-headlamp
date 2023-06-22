import { Icon } from '@iconify/react';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Button, Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createClusterSecretInstance } from '../../configs/k8s-resource-instances/resources/secret';
import { ICONS } from '../../constants/icons';
import { useHandleEditorSaveNew } from '../../hooks/useHandleEditorSave';
import { pluginLib } from '../../plugin.globals';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { Render } from '../Render';
import { ClusterCertificate } from './components/ClusterCertificate';
import { ClusterHost } from './components/ClusterHost';
import { ClusterName } from './components/ClusterName';
import { ClusterToken } from './components/ClusterToken';
import { useCreateClusterSecret } from './hooks/useCreateClusterSecret';
import { CLUSTER_CREATION_FORM_NAMES } from './names';
import { useStyles } from './styles';
import { CreateClusterFormNames } from './types';
import { getUsedValues } from './utils/getUsedValues';

const {
    CommonComponents: { EditorDialog },
} = pluginLib;

export const CreateCluster = () => {
    const { activeDialog, openDialog, closeDialog } = useDialogContext();
    const classes = useStyles();
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
    const [editorClusterSecretData, setEditorClusterSecretData] =
        React.useState<KubeObjectInterface>(null);

    const methods = useForm<CreateClusterFormNames>({
        mode: 'onBlur',
    });

    const {
        handleSubmit,
        reset,
        resetField,
        getValues,
        formState: { isDirty },
        setValue,
    } = methods;

    const handleOpenEditor = React.useCallback(() => {
        setEditorOpen(true);
        const formValues = getValues();
        const usedValues = getUsedValues(formValues, CLUSTER_CREATION_FORM_NAMES);
        const newClusterSecretData = createClusterSecretInstance(
            CLUSTER_CREATION_FORM_NAMES,
            usedValues
        );
        setEditorClusterSecretData(newClusterSecretData);
    }, [getValues]);

    const handleCloseEditor = React.useCallback(() => setEditorOpen(false), []);

    const handleResetFields = React.useCallback(() => {
        reset();
    }, [reset]);

    const { handleEditorSave } = useHandleEditorSaveNew({
        names: CLUSTER_CREATION_FORM_NAMES,
        setValue,
        resetField,
    });

    const onEditorSave = React.useCallback(
        (editorReturnValues: KubeObjectInterface[]) => {
            const formValues = getValues();
            const usedValues = getUsedValues(formValues, CLUSTER_CREATION_FORM_NAMES);
            handleEditorSave(editorReturnValues, usedValues);
            handleCloseEditor();
        },
        [getValues, handleCloseEditor, handleEditorSave]
    );

    const {
        createClusterSecret,
        mutations: { clusterSecretCreateMutation },
    } = useCreateClusterSecret({
        onSuccess: () => {
            closeDialog();
        },
        onError: () => {
            openDialog();
        },
    });

    const isLoading = React.useMemo(
        () => clusterSecretCreateMutation.isLoading,
        [clusterSecretCreateMutation.isLoading]
    );

    const onSubmit = React.useCallback(async () => {
        const values = getValues();
        const usedValues = getUsedValues(values, CLUSTER_CREATION_FORM_NAMES);

        const newClusterSecretData = createClusterSecretInstance(
            CLUSTER_CREATION_FORM_NAMES,
            usedValues
        );

        await createClusterSecret({
            clusterSecretData: newClusterSecretData,
        });
        reset();
    }, [createClusterSecret, getValues, reset]);

    return (
        <Dialog open={activeDialog.open} onClose={closeDialog} fullWidth>
            <div className={classes.dialog} data-testid="create-cluster">
                <div className={classes.dialogTitle}>
                    <Grid container alignItems={'center'} spacing={1}>
                        <Grid item>
                            <Typography variant={'h5'}>Create New Cluster</Typography>
                        </Grid>
                    </Grid>
                    <Button
                        startIcon={<Icon icon={ICONS.PENCIL} />}
                        size="small"
                        component={'button'}
                        onClick={handleOpenEditor}
                        style={{ flexShrink: 0 }}
                    >
                        Edit YAML
                    </Button>
                </div>
                <DialogContent className={classes.dialogContent}>
                    <FormProvider {...methods}>
                        <div className={classes.form}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={classes.formInner}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <ClusterName names={CLUSTER_CREATION_FORM_NAMES} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ClusterHost names={CLUSTER_CREATION_FORM_NAMES} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ClusterToken names={CLUSTER_CREATION_FORM_NAMES} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ClusterCertificate
                                                names={CLUSTER_CREATION_FORM_NAMES}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className={classes.actions}>
                                    <Button
                                        onClick={handleResetFields}
                                        size="small"
                                        component={'button'}
                                        disabled={!isDirty}
                                    >
                                        undo changes
                                    </Button>
                                    <Button
                                        onClick={closeDialog}
                                        size="small"
                                        component={'button'}
                                        style={{ marginLeft: 'auto' }}
                                    >
                                        cancel
                                    </Button>
                                    <Button
                                        type={'submit'}
                                        variant={'contained'}
                                        color={'primary'}
                                        size="small"
                                        disabled={!isDirty || isLoading}
                                    >
                                        apply
                                    </Button>
                                </div>
                            </form>
                        </div>
                        <Render condition={editorOpen}>
                            <EditorDialog
                                open={editorOpen}
                                item={editorClusterSecretData}
                                onClose={handleCloseEditor}
                                onSave={onEditorSave}
                            />
                        </Render>
                    </FormProvider>
                </DialogContent>
            </div>
        </Dialog>
    );
};
