import { omit } from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { MuiCore, React } from '../../../../plugin.globals';
import { FieldEventTarget } from '../../../../types/forms';
import { Applications } from '../../../FormFields/CDPipelineFields';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useEditorCode } from './hooks/useEditorCode';
import { useNames } from './hooks/useNames';
import { useStyles } from './styles';
import { EditCDPipelineFormProps } from './types';

const { Button, Grid } = MuiCore;

export const EditCDPipelineForm = ({
    handleApply,
    setDialogOpen,
    CDPipelineData,
}: EditCDPipelineFormProps) => {
    const classes = useStyles();

    const { names } = useNames();
    const { baseDefaultValues } = useDefaultValues({ names, CDPipelineData });

    const [formValues, setFormValues] =
        React.useState<EDPCDPipelineKubeObjectInterface>(baseDefaultValues);

    const methods = useForm({
        defaultValues: baseDefaultValues,
    });

    const {
        handleSubmit,
        reset,
        formState: { isDirty },
    } = methods;

    const handleFormFieldChange = React.useCallback(
        ({ name, value }: FieldEventTarget) => {
            setFormValues(prev => {
                if (Object.hasOwn(names[name], 'notUsedInFormData')) {
                    return prev;
                }

                if (value === undefined) {
                    return omit(prev, name) as EDPCDPipelineKubeObjectInterface;
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
        kubeObjectData: CDPipelineData,
    });

    const onSubmit = React.useCallback(() => {
        handleApply({
            CDPipelineData: editorReturnValues,
        });
    }, [editorReturnValues, handleApply]);

    return (
        <FormProvider {...methods}>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.formInner}>
                        <Grid container spacing={3}>
                            <Applications
                                names={names}
                                handleFormFieldChange={handleFormFieldChange}
                            />
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
