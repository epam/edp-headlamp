import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Render } from '../../../../components/Render';
import { useHandleEditorSave } from '../../../../hooks/useHandleEditorSave';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { GIT_SERVER_FORM_NAMES } from '../../names';
import { CreateGitServerFormValues } from '../../types';
import {
    GitProvider,
    HostName,
    HTTPSPort,
    SSHPort,
    SSHPrivateKey,
    Token,
    UserName,
} from '../fields';
import { FormProps } from './types';

export const Form = ({ editorOpen, editorData, setEditorOpen }: FormProps) => {
    const { getValues, setValue, resetField } = useFormContext<CreateGitServerFormValues>();
    const handleCloseEditor = React.useCallback(() => setEditorOpen(false), [setEditorOpen]);

    const { handleEditorSave } = useHandleEditorSave({
        names: GIT_SERVER_FORM_NAMES,
        setValue,
        resetField,
    });

    const onEditorSave = React.useCallback(
        (editorReturnValues: EDPGitServerKubeObjectInterface[]) => {
            const formValues = getValues();
            const usedValues = getUsedValues(formValues, GIT_SERVER_FORM_NAMES);
            handleEditorSave(editorReturnValues, usedValues);
            handleCloseEditor();
        },
        [getValues, handleCloseEditor, handleEditorSave]
    );

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <GitProvider />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <HostName />
                        </Grid>
                        <Grid item xs={6}>
                            <UserName />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <SSHPort />
                        </Grid>
                        <Grid item xs={6}>
                            <HTTPSPort />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Token />
                </Grid>
                <Grid item xs={12}>
                    <SSHPrivateKey />
                </Grid>
            </Grid>
            <Render condition={!!editorOpen}>
                <EditorDialog
                    open={editorOpen}
                    item={editorData}
                    onClose={() => setEditorOpen(false)}
                    onSave={onEditorSave}
                />
            </Render>
        </>
    );
};
