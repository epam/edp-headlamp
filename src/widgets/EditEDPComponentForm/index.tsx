import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { FormContextProvider } from '../../providers/Form';
import { rem } from '../../utils/styling/rem';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useDefaultValues } from './hooks/useDefaultValues';
import { EditEDPComponentFormProps } from './types';

export const EditEDPComponentForm = ({ EDPComponent }: EditEDPComponentFormProps) => {
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
    const [editorData, setEditorData] = React.useState<EDPComponentKubeObjectInterface>(
        {} as EDPComponentKubeObjectInterface
    );

    const defaultValues = useDefaultValues({ EDPComponent });

    console.log(defaultValues);

    return (
        <Paper style={{ padding: rem(20) }}>
            <FormContextProvider
                formSettings={{
                    mode: 'onBlur',
                    defaultValues: defaultValues,
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DialogHeader
                            EDPComponent={EDPComponent}
                            setEditorData={setEditorData}
                            setEditorOpen={setEditorOpen}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Form
                            editorOpen={editorOpen}
                            editorData={editorData}
                            setEditorOpen={setEditorOpen}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <FormActions EDPComponent={EDPComponent} />
                    </Grid>
                </Grid>
            </FormContextProvider>
        </Paper>
    );
};
