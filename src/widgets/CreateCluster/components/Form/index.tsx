import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Render } from '../../../../components/Render';
import { useHandleEditorSave } from '../../../../hooks/useHandleEditorSave';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { CLUSTER_CREATION_FORM_NAMES } from '../../names';
import { CreateClusterFormValues } from '../../types';
import { ClusterCertificate, ClusterHost, ClusterName, ClusterToken } from '../fields';
import { FormProps } from './types';

export const Form = ({ editorOpen, editorData, setEditorOpen }: FormProps) => {
    const { setValue, resetField, getValues } = useFormContext<CreateClusterFormValues>();

    const handleCloseEditor = React.useCallback(() => setEditorOpen(false), [setEditorOpen]);

    const { handleEditorSave } = useHandleEditorSave({
        names: CLUSTER_CREATION_FORM_NAMES,
        setValue,
        resetField,
    });

    const onEditorSave = React.useCallback(
        (editorReturnValues: KubeObjectInterface[]) => {
            const formValues = getValues();
            const usedValues = getUsedValues(formValues, CLUSTER_CREATION_FORM_NAMES);
            handleEditorSave(editorReturnValues, usedValues);
            handleCloseEditor();
        },
        [getValues, handleCloseEditor, handleEditorSave]
    );

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ClusterName />
                </Grid>
                <Grid item xs={12}>
                    <ClusterHost />
                </Grid>
                <Grid item xs={12}>
                    <ClusterToken />
                </Grid>
                <Grid item xs={12}>
                    <ClusterCertificate />
                </Grid>
            </Grid>
            <Render condition={editorOpen}>
                <EditorDialog
                    open={editorOpen}
                    item={editorData}
                    onClose={handleCloseEditor}
                    onSave={onEditorSave}
                />
            </Render>
        </>
    );
};
