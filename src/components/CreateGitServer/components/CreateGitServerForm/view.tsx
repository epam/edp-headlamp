import type { DialogProps } from '@material-ui/core/Dialog';
import lodashOmit from 'lodash.omit';
import { FormProvider, useForm } from 'react-hook-form';
import { createGitServerSecretInstance } from '../../../../configs/k8s-resource-instances/resources/secret';
import { useHandleEditorSave } from '../../../../hooks/useHandleEditorSave';
import { useNamespaces } from '../../../../hooks/useNamespaces';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { FieldEventTarget } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import {
    GitProvider,
    HostName,
    HTTPSPort,
    Namespace,
    SecretString,
    SSHPort,
    SSHPrivateKey,
    SSHPublicKey,
    Token,
    UserName,
} from '../../../FormFields/GitServerFields';
import { Render } from '../../../Render';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useEditorCode } from './hooks/useEditorCode';
import { GIT_SERVER_NAMES, GIT_SERVER_SECRET_NAMES } from './names';
import { useStyles } from './styles';
import { CreateGitServerFormProps } from './types';

const { Button, Grid } = MuiCore;

const {
    CommonComponents: { EditorDialog },
} = pluginLib;

export const CreateGitServerForm = ({
    editorOpen,
    setEditorOpen,
    handleApply,
    setDialogOpen,
    isApplying,
}: CreateGitServerFormProps): React.ReactElement => {
    const classes = useStyles();

    const { baseDefaultValues } = useDefaultValues({ names: GIT_SERVER_NAMES });

    const { namespaces } = useNamespaces();

    const [formValues, setFormValues] =
        React.useState<DeepPartial<EDPGitServerKubeObjectInterface>>(baseDefaultValues);

    const methods = useForm({
        defaultValues: baseDefaultValues,
    });

    const {
        handleSubmit,
        reset,
        resetField,
        formState: { isDirty },
        setValue,
    } = methods;

    const handleFormFieldChange = React.useCallback(({ name, value }: FieldEventTarget) => {
        setFormValues(prev => {
            if (Object.hasOwn(GIT_SERVER_NAMES[name], 'notUsedInFormData')) {
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
        names: GIT_SERVER_NAMES,
        setValue,
        handleFormFieldChange,
        formValues,
        resetField,
    });

    const { editorReturnValues } = useEditorCode({
        names: GIT_SERVER_NAMES,
        formValues,
    });

    const onEditorSave = React.useCallback(
        (editorPropsObject: EDPGitServerKubeObjectInterface) => {
            handleEditorSave(editorPropsObject);
            setEditorOpen(false);
        },
        [handleEditorSave, setEditorOpen]
    );

    const muDialogProps: DialogProps = {
        open: editorOpen,
    };

    const onSubmit = React.useCallback(
        ({ namespace, gitUser, sshPrivateKey, sshPublicKey, token, secretString }) => {
            const {
                metadata: { name },
            } = editorReturnValues;
            const gitServerSecretInstance = createGitServerSecretInstance(GIT_SERVER_SECRET_NAMES, {
                namespace,
                name,
                gitUser: btoa(unescape(gitUser)),
                sshPrivateKey: btoa(unescape(sshPrivateKey)),
                sshPublicKey: btoa(unescape(sshPublicKey)),
                token: btoa(unescape(token)),
                secretString: btoa(unescape(secretString)),
            });

            handleApply(editorReturnValues, gitServerSecretInstance);
        },
        [editorReturnValues, handleApply]
    );

    return (
        <FormProvider {...methods}>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.formInner}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Namespace
                                    handleFormFieldChange={handleFormFieldChange}
                                    names={GIT_SERVER_NAMES}
                                    namespaces={namespaces}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GitProvider
                                    handleFormFieldChange={handleFormFieldChange}
                                    names={GIT_SERVER_NAMES}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <HostName
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <UserName
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <SSHPort
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <HTTPSPort
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <SSHPrivateKey
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <SSHPublicKey
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1} alignItems={'flex-end'}>
                                    <Grid item xs={6}>
                                        <Token
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <SecretString
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                </Grid>
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
