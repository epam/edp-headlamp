import type { DialogProps } from '@material-ui/core/Dialog';
import lodashOmit from 'lodash.omit';
import { FormProvider, useForm } from 'react-hook-form';
import { useHandleEditorSave } from '../../../../hooks/useHandleEditorSave';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { DeepPartial } from '../../../../types/global';
import { Render } from '../../../Render';
import { BranchName } from './components/fields';
import { FromCommit } from './components/fields/FromCommit';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useEditorCode } from './hooks/useEditorCode';
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
}: CreateCodebaseBranchFormProps): React.ReactElement => {
    const classes = useStyles();

    const { baseDefaultValues } = useDefaultValues({ names: CODEBASE_BRANCH_NAMES });

    const [formValues, setFormValues] =
        React.useState<DeepPartial<EDPCodebaseBranchKubeObjectInterface>>(baseDefaultValues);

    const methods = useForm();

    const {
        handleSubmit,
        reset,
        resetField,
        formState: { isDirty },
        setValue,
    } = methods;

    const handleFormFieldChange = React.useCallback(({ target: { name, value } }) => {
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

    const { editorCode } = useEditorCode({
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

    const onSubmit = React.useCallback(() => {
        handleApply(editorCode);
    }, [editorCode, handleApply]);

    return (
        <FormProvider {...methods}>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.formInner}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <BranchName
                                    names={CODEBASE_BRANCH_NAMES}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FromCommit
                                    names={CODEBASE_BRANCH_NAMES}
                                    handleFormFieldChange={handleFormFieldChange}
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
                            disabled={!isDirty}
                        >
                            apply
                        </Button>
                    </div>
                </form>
            </div>
            <Render condition={!!editorOpen}>
                <EditorDialog
                    {...muDialogProps}
                    item={editorCode}
                    onClose={() => setEditorOpen(false)}
                    onSave={onEditorSave}
                />
            </Render>
        </FormProvider>
    );
};
