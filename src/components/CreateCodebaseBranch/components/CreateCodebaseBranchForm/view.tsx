import type { DialogProps } from '@material-ui/core/Dialog';
import lodashOmit from 'lodash.omit';
import { FormProvider, useForm } from 'react-hook-form';
import { editCodebaseBranchInstance } from '../../../../configs/k8s-resource-instances/custom-resources/codebase-branch';
import { CODEBASE_VERSIONING_TYPES } from '../../../../constants/codebaseVersioningTypes';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../constants/statuses';
import { useHandleEditorSave } from '../../../../hooks/useHandleEditorSave';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { FieldEventTarget } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import { createVersioningString } from '../../../../utils/createVersioningString';
import { BranchName } from '../../../FormFields/CodebaseBranchFields';
import { BranchVersion } from '../../../FormFields/CodebaseBranchFields/BranchVersion';
import { DefaultBranchVersion } from '../../../FormFields/CodebaseBranchFields/DefaultBranchVersion';
import { FromCommit } from '../../../FormFields/CodebaseBranchFields/FromCommit';
import { ReleaseBranch } from '../../../FormFields/CodebaseBranchFields/ReleaseBranch';
import { Render } from '../../../Render';
import { useDefaultBranch } from './hooks/useDefaultBranch';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useEditorCode } from './hooks/useEditorCode';
import { useUpdateBranchVersionFields } from './hooks/useUpdateBranchVersionFields';
import { CODEBASE_BRANCH_BACKWARDS_NAME_MAPPING, CODEBASE_BRANCH_NAMES } from './names';
import { useStyles } from './styles';
import { CreateCodebaseBranchFormProps } from './types';

const { Button, Grid } = MuiCore;

const {
    CommonComponents: { EditorDialog },
} = pluginLib;

export const CreateCodebaseBranchForm = ({
    codebaseData,
    editorOpen,
    setEditorOpen,
    handleApply,
    setDialogOpen,
    isApplying,
}: CreateCodebaseBranchFormProps): React.ReactElement => {
    const classes = useStyles();

    const { defaultBranch } = useDefaultBranch({ codebaseData });
    const defaultBranchVersion = React.useMemo(
        () => (defaultBranch ? defaultBranch.spec.version : undefined),
        [defaultBranch]
    );

    const { baseDefaultValues } = useDefaultValues({
        names: CODEBASE_BRANCH_NAMES,
        codebaseData,
        defaultBranchVersion,
    });

    const [formValues, setFormValues] =
        React.useState<DeepPartial<EDPCodebaseBranchKubeObjectInterface>>(baseDefaultValues);

    const methods = useForm({
        defaultValues: baseDefaultValues,
    });

    const {
        handleSubmit,
        reset,
        resetField,
        formState: { isDirty },
        setValue,
        watch,
    } = methods;

    const handleFormFieldChange = React.useCallback(({ name, value }: FieldEventTarget) => {
        setFormValues(prev => {
            if (Object.hasOwn(CODEBASE_BRANCH_NAMES[name], 'notUsedInFormData')) {
                return prev;
            }

            if (value === undefined) {
                return lodashOmit(prev, name);
            }

            return {
                ...prev,
                [name]: value,
            };
        });
    }, []);

    const handleResetFields = React.useCallback(() => {
        setFormValues(baseDefaultValues);
        reset();
    }, [baseDefaultValues, reset]);

    const { handleEditorSave } = useHandleEditorSave({
        names: CODEBASE_BRANCH_NAMES,
        backwardNames: CODEBASE_BRANCH_BACKWARDS_NAME_MAPPING,
        setValue,
        handleFormFieldChange,
        formValues,
        resetField,
    });

    const { editorReturnValues } = useEditorCode({
        names: CODEBASE_BRANCH_NAMES,
        formValues,
        codebaseName: codebaseData.metadata.name,
        namespace: codebaseData.metadata.namespace,
    });

    const onEditorSave = React.useCallback(
        (editorPropsObject: EDPCodebaseBranchKubeObjectInterface) => {
            handleEditorSave(editorPropsObject);
            setEditorOpen(false);
        },
        [handleEditorSave, setEditorOpen]
    );

    const muDialogProps: DialogProps = {
        open: editorOpen,
    };

    const defaultBranchVersionFieldValue = watch(
        CODEBASE_BRANCH_NAMES.defaultBranchVersionStart.name
    );
    const defaultBranchPostfixFieldValue = watch(
        CODEBASE_BRANCH_NAMES.defaultBranchVersionPostfix.name
    );

    const newDefaultBranchVersion = React.useMemo(
        () =>
            createVersioningString(defaultBranchVersionFieldValue, defaultBranchPostfixFieldValue),
        [defaultBranchPostfixFieldValue, defaultBranchVersionFieldValue]
    );
    const releaseFieldValue = watch(CODEBASE_BRANCH_NAMES.release.name);

    const onSubmit = React.useCallback(() => {
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
            handleApply(editorReturnValues, newDefaultBranch);
        } else {
            handleApply(editorReturnValues);
        }
    }, [
        defaultBranch,
        editorReturnValues,
        handleApply,
        newDefaultBranchVersion,
        releaseFieldValue,
    ]);

    useUpdateBranchVersionFields({
        defaultBranchVersion,
        watch,
        names: CODEBASE_BRANCH_NAMES,
        setValue,
        handleFormFieldChange,
    });

    const canCreateReleaseBranch = React.useMemo(
        () =>
            codebaseData.spec.versioning.type === CODEBASE_VERSIONING_TYPES['EDP'] &&
            defaultBranch &&
            defaultBranch.status.status === CUSTOM_RESOURCE_STATUSES['CREATED'],
        [codebaseData.spec.versioning.type, defaultBranch]
    );

    return (
        <FormProvider {...methods}>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.formInner}>
                        <Grid container spacing={2}>
                            <Render condition={canCreateReleaseBranch}>
                                <Grid item xs={12}>
                                    <ReleaseBranch
                                        names={CODEBASE_BRANCH_NAMES}
                                        handleFormFieldChange={handleFormFieldChange}
                                        defaultBranchVersion={defaultBranchVersion}
                                    />
                                </Grid>
                            </Render>
                            <Grid item xs={12}>
                                <BranchName
                                    names={CODEBASE_BRANCH_NAMES}
                                    handleFormFieldChange={handleFormFieldChange}
                                    defaultBranchVersion={defaultBranchVersion}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FromCommit
                                    names={CODEBASE_BRANCH_NAMES}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                            </Grid>
                            <Render condition={canCreateReleaseBranch}>
                                <>
                                    <Grid item xs={12}>
                                        <BranchVersion
                                            names={CODEBASE_BRANCH_NAMES}
                                            handleFormFieldChange={handleFormFieldChange}
                                        />
                                    </Grid>
                                    <Render condition={!!releaseFieldValue}>
                                        <Grid item xs={12}>
                                            <DefaultBranchVersion
                                                names={CODEBASE_BRANCH_NAMES}
                                                handleFormFieldChange={handleFormFieldChange}
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
                            onClick={() => setDialogOpen(false)}
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
                            disabled={!isDirty || isApplying}
                        >
                            apply
                        </Button>
                    </div>
                </form>
            </div>
            <Render condition={!!editorOpen}>
                <EditorDialog
                    {...muDialogProps}
                    item={editorReturnValues}
                    onClose={() => setEditorOpen(false)}
                    onSave={onEditorSave}
                />
            </Render>
        </FormProvider>
    );
};
