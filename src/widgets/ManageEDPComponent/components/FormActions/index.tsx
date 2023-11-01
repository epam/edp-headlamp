import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { Render } from '../../../../components/Render';
import { useCreateEDPComponent } from '../../../../k8s/EDPComponent/hooks/useCreateEDPComponent';
import { EDPComponentKubeObjectInterface } from '../../../../k8s/EDPComponent/types';
import { createEDPComponentInstance } from '../../../../k8s/EDPComponent/utils/createEDPComponentInstance';
import { editEDPComponentInstance } from '../../../../k8s/EDPComponent/utils/editEDPComponentInstance';
import { useFormContext } from '../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { EDP_COMPONENT_FORM_NAMES } from '../../names';
import { ManageEDPComponentDataContext, ManageEDPComponentValues } from '../../types';

export const FormActions = () => {
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
        getValues,
    } = useReactHookFormContext<ManageEDPComponentValues>();
    const {
        formData: { currentElement, handleClosePlaceholder, isReadOnly },
    } = useFormContext<ManageEDPComponentDataContext>();

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';
    const mode = isPlaceholder ? FORM_MODES.CREATE : FORM_MODES.EDIT;

    const {
        createEDPComponent,
        editEDPComponent,
        mutations: { EDPComponentEditMutation, EDPComponentCreateMutation },
    } = useCreateEDPComponent({
        onSuccess: () => {
            if (mode === FORM_MODES.CREATE) {
                handleClosePlaceholder();
            } else {
                const values = getValues();
                reset(values);
            }
        },
    });

    const isLoading = EDPComponentEditMutation.isLoading || EDPComponentCreateMutation.isLoading;

    const onSubmit = React.useCallback(
        async (values: ManageEDPComponentValues) => {
            const EDPComponentCreateInstance = createEDPComponentInstance(
                EDP_COMPONENT_FORM_NAMES,
                values
            );

            const EDPComponentEditedInstance = editEDPComponentInstance(
                EDP_COMPONENT_FORM_NAMES,
                currentElement as EDPComponentKubeObjectInterface,
                values
            );

            if (mode === FORM_MODES.CREATE) {
                await createEDPComponent({ EDPComponentData: EDPComponentCreateInstance });
            } else {
                await editEDPComponent({ EDPComponentData: EDPComponentEditedInstance });
            }
        },
        [currentElement, mode, createEDPComponent, editEDPComponent]
    );

    return (
        <>
            <Grid container spacing={2} justifyContent={'space-between'}>
                <Grid item>
                    <Render condition={mode === FORM_MODES.CREATE}>
                        <Button onClick={handleClosePlaceholder} size="small" component={'button'}>
                            cancel
                        </Button>
                    </Render>
                </Grid>
                <Grid item>
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item>
                            <Button
                                onClick={() => reset()}
                                size="small"
                                component={'button'}
                                disabled={!isDirty || isReadOnly}
                            >
                                undo changes
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                type={'button'}
                                size={'small'}
                                component={'button'}
                                variant={'contained'}
                                color={'primary'}
                                disabled={isLoading || isReadOnly || !isDirty}
                                onClick={handleSubmit(onSubmit)}
                            >
                                save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
