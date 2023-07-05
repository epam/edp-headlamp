import { Button } from '@material-ui/core';
import { omit } from 'lodash';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { FieldEventTarget } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import { TriggerType } from '../../../FormFields/CDPipelineStageFields';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useEditorCode } from './hooks/useEditorCode';
import { useNames } from './hooks/useNames';
import { useStyles } from './styles';
import { EditCodebaseFormProps } from './types';

export const EditCDPipelineStageForm = ({
    handleApply,
    setDialogOpen,
    CDPipelineStageData,
}: EditCodebaseFormProps) => {
    const classes = useStyles();

    const { names } = useNames();
    const { baseDefaultValues } = useDefaultValues({ names, CDPipelineStageData });

    const [formValues, setFormValues] =
        React.useState<DeepPartial<EDPCDPipelineStageKubeObjectInterface>>(baseDefaultValues);

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
                    return omit(prev, name);
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
        kubeObjectData: CDPipelineStageData,
    });

    const onSubmit = React.useCallback(() => {
        handleApply({
            CDPipelineStageData: editorReturnValues,
        });
    }, [editorReturnValues, handleApply]);

    return (
        <FormProvider {...methods}>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.formInner}>
                        <TriggerType names={names} handleFormFieldChange={handleFormFieldChange} />
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
