import { Grid, Paper } from '@mui/material';
import React from 'react';
import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { isSystemEDPComponent } from '../../k8s/EDPComponent/utils/isSystemEDPComponent';
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

  const isSystem = isSystemEDPComponent(EDPComponent);

  return (
    <Paper style={{ padding: rem(20) }}>
      <FormContextProvider
        formSettings={{
          mode: 'onBlur',
          defaultValues: defaultValues,
        }}
        formData={{ EDPComponent, isSystem }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DialogHeader setEditorData={setEditorData} setEditorOpen={setEditorOpen} />
          </Grid>
          <Grid item xs={12}>
            <Form editorOpen={editorOpen} editorData={editorData} setEditorOpen={setEditorOpen} />
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormActions />
          </Grid>
        </Grid>
      </FormContextProvider>
    </Paper>
  );
};
