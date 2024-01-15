import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useHandleEditorSave } from '../../../../../../hooks/useHandleEditorSave';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { EDP_COMPONENT_FORM_NAMES } from '../../../../names';
import { ManageEDPComponentValues } from '../../../../types';
import { Icon, Name, URL, Visible } from '../../../fields';
import { FormProps } from './types';

export const Form = ({ editorOpen, editorData, setEditorOpen }: FormProps) => {
    const { getValues, setValue, resetField } = useFormContext<ManageEDPComponentValues>();

    const handleCloseEditor = React.useCallback(() => setEditorOpen(false), [setEditorOpen]);

    const { handleEditorSave } = useHandleEditorSave({
        names: EDP_COMPONENT_FORM_NAMES,
        setValue,
        resetField,
    });

    const onEditorSave = React.useCallback(
        (editorReturnValues: KubeObjectInterface[]) => {
            const formValues = getValues();
            const usedValues = getUsedValues(formValues, EDP_COMPONENT_FORM_NAMES);
            handleEditorSave(editorReturnValues, usedValues);
            handleCloseEditor();
        },
        [getValues, handleCloseEditor, handleEditorSave]
    );

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Name />
                        </Grid>
                        <Grid item xs={4}>
                            <URL />
                        </Grid>
                        <Grid item xs={4} style={{ marginTop: 'auto' }}>
                            <Visible />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Icon />
                </Grid>
            </Grid>
            {editorOpen && (
                <EditorDialog
                    open={editorOpen}
                    item={editorData}
                    onClose={handleCloseEditor}
                    onSave={onEditorSave}
                />
            )}
        </>
    );
};
