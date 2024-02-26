import { Grid, Paper } from '@mui/material';
import React from 'react';
import { QuickLinkKubeObjectInterface } from '../../k8s/QuickLink/types';
import { isSystemQuickLink } from '../../k8s/QuickLink/utils/isSystemQuickLink';
import { FormContextProvider } from '../../providers/Form';
import { rem } from '../../utils/styling/rem';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useDefaultValues } from './hooks/useDefaultValues';
import { EditQuickLinkFormProps } from './types';

export const EditQuickLinkForm = ({ QuickLink }: EditQuickLinkFormProps) => {
  const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
  const [editorData, setEditorData] = React.useState<QuickLinkKubeObjectInterface>(
    {} as QuickLinkKubeObjectInterface
  );

  const defaultValues = useDefaultValues({ QuickLink });

  const isSystem = isSystemQuickLink(QuickLink);

  return (
    <Paper style={{ padding: rem(20) }}>
      <FormContextProvider
        formSettings={{
          mode: 'onBlur',
          defaultValues: defaultValues,
        }}
        formData={{ QuickLink, isSystem }}
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
