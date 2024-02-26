import { EditorDialog } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Grid } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useHandleEditorSave } from '../../../../../../hooks/useHandleEditorSave';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { QUICK_LINK_FORM_NAMES } from '../../../../names';
import { ManageQuickLinkValues } from '../../../../types';
import { Icon, URL, Visible } from '../../../fields';
import { FormProps } from './types';

export const Form = ({ editorOpen, editorData, setEditorOpen }: FormProps) => {
  const { getValues, setValue, resetField } = useFormContext<ManageQuickLinkValues>();

  const handleCloseEditor = React.useCallback(() => setEditorOpen(false), [setEditorOpen]);

  const { handleEditorSave } = useHandleEditorSave({
    names: QUICK_LINK_FORM_NAMES,
    setValue,
    resetField,
  });

  const onEditorSave = React.useCallback(
    (editorReturnValues: KubeObjectInterface[]) => {
      const formValues = getValues();
      const usedValues = getUsedValues(formValues, QUICK_LINK_FORM_NAMES);
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
            <Grid item xs={8}>
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
