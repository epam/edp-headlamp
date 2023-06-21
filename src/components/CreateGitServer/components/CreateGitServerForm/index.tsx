import { omit } from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { createGitServerSecretInstance } from '../../../../configs/k8s-resource-instances/resources/secret';
import { useHandleEditorSave } from '../../../../hooks/useHandleEditorSave';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { KubeObjectInterface } from '../../../../plugin.types';
import { FieldEventTarget } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import {
    GitProvider,
    HostName,
    HTTPSPort,
    SSHPort,
    SSHPrivateKey,
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
}: CreateGitServerFormProps) => {
    const classes = useStyles();

    const { baseDefaultValues } = useDefaultValues({ names: GIT_SERVER_NAMES });

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
                return omit(prev, name);
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
        (editorReturnValues: EDPGitServerKubeObjectInterface) => {
            handleEditorSave(editorReturnValues);
            setEditorOpen(false);
        },
        [handleEditorSave, setEditorOpen]
    );

    const onSubmit = React.useCallback(
        ({ gitUser, sshPrivateKey, token }) => {
            const {
                metadata: { name },
            } = editorReturnValues;
            const sshPrivateKeyWithExtraLine = sshPrivateKey.trim() + '\n';

            const gitServerSecretData = createGitServerSecretInstance(GIT_SERVER_SECRET_NAMES, {
                name,
                gitUser: btoa(unescape(gitUser)),
                sshPrivateKey: btoa(unescape(sshPrivateKeyWithExtraLine)),
                token: btoa(unescape(token)),
            });

            handleApply({
                gitServerData: editorReturnValues,
                gitServerSecretData: gitServerSecretData as EDPKubeObjectInterface,
            });
        },
        [editorReturnValues, handleApply]
    );

    return (
        <FormProvider {...methods}>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.formInner}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <GitProvider
                                    handleFormFieldChange={handleFormFieldChange}
                                    names={GIT_SERVER_NAMES}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} style={{ display: 'flex' }}>
                                        <HostName
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                    <Grid item xs={6} style={{ display: 'flex' }}>
                                        <UserName
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} style={{ display: 'flex' }}>
                                        <SSHPort
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                    <Grid item xs={6} style={{ display: 'flex' }}>
                                        <HTTPSPort
                                            handleFormFieldChange={handleFormFieldChange}
                                            names={GIT_SERVER_NAMES}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <Token
                                    handleFormFieldChange={handleFormFieldChange}
                                    names={GIT_SERVER_NAMES}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <SSHPrivateKey
                                    handleFormFieldChange={handleFormFieldChange}
                                    names={GIT_SERVER_NAMES}
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
                            disabled={!isDirty || isApplying}
                        >
                            apply
                        </Button>
                    </div>
                </form>
            </div>
            <Render condition={!!editorOpen}>
                <EditorDialog
                    open={editorOpen}
                    item={editorReturnValues as unknown as KubeObjectInterface}
                    onClose={() => setEditorOpen(false)}
                    onSave={onEditorSave}
                />
            </Render>
        </FormProvider>
    );
};
