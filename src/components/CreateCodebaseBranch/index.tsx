import { Icon } from '@iconify/react';
import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Button, Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import {
    createCodebaseBranchInstanceBasedOnFormValues,
    editCodebaseBranchInstance,
} from '../../configs/k8s-resource-instances/custom-resources/codebase-branch';
import { CODEBASE_VERSIONING_TYPES } from '../../constants/codebaseVersioningTypes';
import { ICONS } from '../../constants/icons';
import { CUSTOM_RESOURCE_STATUSES } from '../../constants/statuses';
import { URL_EDP_HEADLAMP_USER_GUIDE_BRANCH_ADD } from '../../constants/urls';
import { useHandleEditorSaveNew } from '../../hooks/useHandleEditorSave';
import { useDefaultBranchQuery } from '../../k8s/EDPCodebaseBranch/hooks/useDefaultBranchQuery';
import { REQUEST_KEY_QUERY_CODEBASE_BRANCH_LIST_BY_CODEBASE_NAME } from '../../k8s/EDPCodebaseBranch/requestKeys';
import { EDPCodebaseBranchKubeObjectInterface } from '../../k8s/EDPCodebaseBranch/types';
import { createVersioningString } from '../../utils/createVersioningString';
import { DocLink } from '../DocLink';
import { Render } from '../Render';
import { BranchName } from './components/BranchName';
import { BranchVersion } from './components/BranchVersion';
import { DefaultBranchVersion } from './components/DefaultBranchVersion';
import { FromCommit } from './components/FromCommit';
import { ReleaseBranch } from './components/ReleaseBranch';
import { useCreateCodebaseBranch } from './hooks/useCreateCodebaseBranch';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useUpdateBranchVersionFields } from './hooks/useUpdateBranchVersionFields';
import { CODEBASE_BRANCH_BACKWARDS_FIELD_MAPPING, CODEBASE_BRANCH_FORM_NAMES } from './names';
import { useStyles } from './styles';
import { CreateCodebaseBranchFormNames, CreateCodebaseBranchProps } from './types';
import { getUsedValues } from './utils/getUsedValues';

export const CreateCodebaseBranch = ({
    codebaseData,
    open,
    handleCloseDialog,
    handleOpenDialog,
}: CreateCodebaseBranchProps) => {
    const queryClient = useQueryClient();
    const classes = useStyles();
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
    const [editorCodebaseBranchData, setEditorCodebaseBranchData] =
        React.useState<EDPCodebaseBranchKubeObjectInterface>(null);

    const { data: defaultBranch, refetch } = useDefaultBranchQuery({
        props: {
            defaultBranchName: codebaseData.spec.defaultBranch,
            codebaseName: codebaseData.metadata.name,
        },
    });

    const defaultBranchVersion = React.useMemo(
        () => (defaultBranch ? defaultBranch.spec.version : undefined),
        [defaultBranch]
    );

    const baseDefaultValues = useDefaultValues({
        names: CODEBASE_BRANCH_FORM_NAMES,
        codebaseData,
        defaultBranchVersion,
    });

    const methods = useForm<CreateCodebaseBranchFormNames>({
        defaultValues: baseDefaultValues,
        mode: 'onBlur',
    });

    const {
        handleSubmit,
        reset,
        resetField,
        getValues,
        formState: { isDirty },
        setValue,
        watch,
    } = methods;

    const handleOpenEditor = React.useCallback(() => {
        setEditorOpen(true);
        const formValues = getValues();
        const usedValues = getUsedValues(formValues, CODEBASE_BRANCH_FORM_NAMES);
        const newCodebaseBranchData = createCodebaseBranchInstanceBasedOnFormValues(
            CODEBASE_BRANCH_FORM_NAMES,
            usedValues,
            codebaseData.metadata.name
        );
        setEditorCodebaseBranchData(newCodebaseBranchData);
    }, [codebaseData.metadata.name, getValues]);

    const handleCloseEditor = React.useCallback(() => setEditorOpen(false), []);

    const handleResetFields = React.useCallback(() => {
        reset();
    }, [reset]);

    const { handleEditorSave } = useHandleEditorSaveNew({
        names: CODEBASE_BRANCH_FORM_NAMES,
        backwardNames: CODEBASE_BRANCH_BACKWARDS_FIELD_MAPPING,
        setValue,
        resetField,
    });

    const onEditorSave = React.useCallback(
        (editorReturnValues: EDPCodebaseBranchKubeObjectInterface[]) => {
            const formValues = getValues();
            const usedValues = getUsedValues(formValues, CODEBASE_BRANCH_FORM_NAMES);
            handleEditorSave(editorReturnValues, usedValues);
            handleCloseEditor();
        },
        [getValues, handleCloseEditor, handleEditorSave]
    );

    const defaultBranchVersionFieldValue = watch(
        CODEBASE_BRANCH_FORM_NAMES.defaultBranchVersionStart.name
    );
    const defaultBranchPostfixFieldValue = watch(
        CODEBASE_BRANCH_FORM_NAMES.defaultBranchVersionPostfix.name
    );

    const newDefaultBranchVersion = React.useMemo(
        () =>
            createVersioningString(defaultBranchVersionFieldValue, defaultBranchPostfixFieldValue),
        [defaultBranchPostfixFieldValue, defaultBranchVersionFieldValue]
    );
    const releaseFieldValue = watch(CODEBASE_BRANCH_FORM_NAMES.release.name);

    const {
        createCodebaseBranch,
        mutations: { codebaseBranchCreateMutation, codebaseBranchEditMutation },
    } = useCreateCodebaseBranch({
        onSuccess: async () => {
            handleCloseDialog();
            await queryClient.invalidateQueries([
                REQUEST_KEY_QUERY_CODEBASE_BRANCH_LIST_BY_CODEBASE_NAME,
                codebaseData.metadata.name,
            ]);
            await refetch();
        },
        onError: () => {
            handleOpenDialog();
        },
    });

    const isLoading = React.useMemo(
        () => codebaseBranchCreateMutation.isLoading || codebaseBranchEditMutation.isLoading,
        [codebaseBranchCreateMutation.isLoading, codebaseBranchEditMutation.isLoading]
    );

    const onSubmit = React.useCallback(async () => {
        const values = getValues();
        const usedValues = getUsedValues(values, CODEBASE_BRANCH_FORM_NAMES);

        const createCodebaseBranchInstance = createCodebaseBranchInstanceBasedOnFormValues(
            CODEBASE_BRANCH_FORM_NAMES,
            usedValues,
            codebaseData.metadata.name
        );

        if (!!releaseFieldValue) {
            const newDefaultBranch = editCodebaseBranchInstance(
                {
                    version: {
                        name: 'version',
                        path: ['spec', 'version'],
                    },
                },
                defaultBranch,
                { version: newDefaultBranchVersion }
            );
            await createCodebaseBranch({
                codebaseBranchData: createCodebaseBranchInstance,
                defaultCodebaseBranchData: newDefaultBranch,
            });
        } else {
            await createCodebaseBranch({
                codebaseBranchData: createCodebaseBranchInstance,
            });
        }
        reset();
    }, [
        getValues,
        codebaseData.metadata.name,
        releaseFieldValue,
        reset,
        defaultBranch,
        newDefaultBranchVersion,
        createCodebaseBranch,
    ]);

    useUpdateBranchVersionFields({
        defaultBranchVersion,
        watch,
        names: CODEBASE_BRANCH_FORM_NAMES,
        setValue,
        isDirty,
    });

    const canCreateReleaseBranch = React.useMemo(
        () =>
            codebaseData.spec.versioning.type === CODEBASE_VERSIONING_TYPES.EDP &&
            defaultBranch &&
            defaultBranch.status.status === CUSTOM_RESOURCE_STATUSES.CREATED,
        [codebaseData.spec.versioning.type, defaultBranch]
    );

    return (
        <Dialog open={open} onClose={handleCloseDialog} fullWidth>
            <div className={classes.dialog} data-testid={'create-codebase-branch'}>
                <div className={classes.dialogTitle}>
                    <Grid container alignItems={'center'} spacing={1}>
                        <Grid item>
                            <Typography variant={'h5'}>Create New Branch</Typography>
                        </Grid>
                        <Grid item>
                            <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE_BRANCH_ADD} />
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
                                        <Render condition={canCreateReleaseBranch}>
                                            <Grid item xs={12}>
                                                <ReleaseBranch
                                                    names={CODEBASE_BRANCH_FORM_NAMES}
                                                    defaultBranchVersion={defaultBranchVersion}
                                                />
                                            </Grid>
                                        </Render>
                                        <Grid item xs={12}>
                                            <BranchName
                                                names={CODEBASE_BRANCH_FORM_NAMES}
                                                defaultBranchVersion={defaultBranchVersion}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FromCommit names={CODEBASE_BRANCH_FORM_NAMES} />
                                        </Grid>
                                        <Render condition={canCreateReleaseBranch}>
                                            <>
                                                <Grid item xs={12}>
                                                    <BranchVersion
                                                        names={CODEBASE_BRANCH_FORM_NAMES}
                                                    />
                                                </Grid>
                                                <Render condition={!!releaseFieldValue}>
                                                    <Grid item xs={12}>
                                                        <DefaultBranchVersion
                                                            names={CODEBASE_BRANCH_FORM_NAMES}
                                                        />
                                                    </Grid>
                                                </Render>
                                            </>
                                        </Render>
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
                                        onClick={handleCloseDialog}
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
                                item={editorCodebaseBranchData}
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
