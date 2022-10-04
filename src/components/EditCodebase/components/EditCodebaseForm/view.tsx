import lodashOmit from 'lodash.omit';
import { FormProvider, useForm } from 'react-hook-form';
import { useJiraServers } from '../../../../hooks/useJiraServers';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEventTarget } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import {
    AdvancedJiraMapping,
    CommitMessagePattern,
    JiraServer,
    JiraServerIntegration,
    TicketNamePattern,
} from '../../../FormFields/CodebaseFields';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useEditorCode } from './hooks/useEditorCode';
import { useNames } from './hooks/useNames';
import { useUpdateJiraServerIntegrationValue } from './hooks/useUpdateJiraServerIntegrationValue';
import { useStyles } from './styles';
import { EditCodebaseFormProps } from './types';

const { Button, Grid } = MuiCore;

export const EditCodebaseForm = ({
    handleApply,
    setDialogOpen,
    codebaseData,
}: EditCodebaseFormProps): React.ReactElement => {
    const classes = useStyles();

    const { names } = useNames();
    const { baseDefaultValues } = useDefaultValues({ names, codebaseData });

    const [formValues, setFormValues] =
        React.useState<DeepPartial<EDPCodebaseKubeObjectInterface>>(baseDefaultValues);

    const methods = useForm({
        defaultValues: baseDefaultValues,
    });

    const {
        handleSubmit,
        reset,
        watch,
        formState: { isDirty },
        setValue,
    } = methods;

    const handleFormFieldChange = React.useCallback(
        ({ name, value }: FieldEventTarget) => {
            setFormValues(prev => {
                if (Object.hasOwn(names[name], 'notUsedInFormData')) {
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
        },
        [names]
    );

    const handleResetFields = React.useCallback(() => {
        setFormValues(baseDefaultValues);
        reset();
    }, [baseDefaultValues, reset]);

    const { editorReturnValues } = useEditorCode({
        names,
        formValues,
        kubeObjectData: codebaseData,
    });

    const onSubmit = React.useCallback(() => {
        handleApply(editorReturnValues);
    }, [editorReturnValues, handleApply]);

    const hasJiraServerIntegrationFieldValue = watch(names.hasJiraServerIntegration.name);

    const { jiraServers } = useJiraServers({ namespace: codebaseData.metadata.namespace });

    useUpdateJiraServerIntegrationValue({ watch, setValue, names });

    return (
        <FormProvider {...methods}>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.formInner}>
                        <Grid container spacing={1}>
                            <JiraServerIntegration
                                names={names}
                                handleFormFieldChange={handleFormFieldChange}
                                jiraServers={jiraServers}
                            />
                            {jiraServers.length && hasJiraServerIntegrationFieldValue ? (
                                <>
                                    <JiraServer
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                        jiraServers={jiraServers}
                                    />
                                    <CommitMessagePattern
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                    />
                                    <TicketNamePattern
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                    />
                                    <AdvancedJiraMapping
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                    />
                                </>
                            ) : null}
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
        </FormProvider>
    );
};
