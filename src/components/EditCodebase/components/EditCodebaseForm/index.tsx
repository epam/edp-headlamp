import lodashOmit from 'lodash.omit';
import { FormProvider, useForm } from 'react-hook-form';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { useJiraServerNameListQuery } from '../../../../k8s/JiraServer/hooks/useJiraServerNameListQuery';
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

    const hasJiraServerIntegrationFieldValue = watch(names.hasJiraServerIntegration.name);

    const { editorReturnValues } = useEditorCode({
        names,
        formValues: {
            ...formValues,
            jiraIssueMetadataPayload: hasJiraServerIntegrationFieldValue
                ? formValues.jiraIssueMetadataPayload
                : '',
            jiraServer: hasJiraServerIntegrationFieldValue ? formValues.jiraServer : '',
        },
        kubeObjectData: codebaseData,
    });

    const onSubmit = React.useCallback(() => {
        const {
            spec: { jiraServer, commitMessagePattern, ticketNamePattern, jiraIssueMetadataPayload },
        } = codebaseData;

        handleApply({
            codebaseData: editorReturnValues,
        });
        reset();

        setValue(names.hasJiraServerIntegration.name, !!jiraServer);
        setValue(names.jiraServer.name, jiraServer);
        setValue(names.commitMessagePattern.name, commitMessagePattern);
        setValue(names.ticketNamePattern.name, ticketNamePattern);
        setValue(names.jiraIssueMetadataPayload.name, jiraIssueMetadataPayload);
    }, [codebaseData, editorReturnValues, handleApply, names, reset, setValue]);

    const { data: jiraServersNames } = useJiraServerNameListQuery();

    useUpdateJiraServerIntegrationValue({ watch, setValue, names });

    return (
        <FormProvider {...methods}>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.formInner}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <CommitMessagePattern
                                    names={names}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <JiraServerIntegration
                                    names={names}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                            </Grid>
                            {jiraServersNames &&
                            jiraServersNames.length &&
                            hasJiraServerIntegrationFieldValue ? (
                                <>
                                    <Grid item xs={12}>
                                        <JiraServer
                                            names={names}
                                            handleFormFieldChange={handleFormFieldChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TicketNamePattern
                                            names={names}
                                            handleFormFieldChange={handleFormFieldChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AdvancedJiraMapping
                                            names={names}
                                            handleFormFieldChange={handleFormFieldChange}
                                        />
                                    </Grid>
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
