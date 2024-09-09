import { Grid } from '@mui/material';
import React from 'react';
import { MultiFormContextProvider } from '../../providers/MultiForm/provider';
import { FormItem } from '../../providers/MultiForm/types';
import { FORM_MODES } from '../../types/forms';
import { Actions } from './components/Actions';
import { CodemieForm } from './components/Codemie';
import { CodemieSecretForm } from './components/CodemieSecret';
import { QuickLinkForm } from './components/QuickLink';
import { useCodemieCreateForm } from './hooks/useCodemieCreateForm';
import { useCodemieEditForm } from './hooks/useCodemieEditForm';
import { useCodemieSecretCreateForm } from './hooks/useCodemieSecretCreateForm';
import { useCodemieSecretEditForm } from './hooks/useCodemieSecretEditForm';
import { useQuickLinkEditForm } from './hooks/useQuickLinkEditForm';
import { DataContextProvider } from './providers/Data';
import { FormNames, ManageCodeMieProps } from './types';

export const ManageCodeMie = ({
  quickLink,
  codemie,
  codemieSecret,
  handleClosePanel,
}: ManageCodeMieProps) => {
  const quickLinkFormMode = FORM_MODES.EDIT;
  const codemieFormMode = codemie ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const codemieSecretFormMode = codemieSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const quickLinkEditForm = useQuickLinkEditForm({
    quickLink,
  });

  const codemieCreateForm = useCodemieCreateForm({ handleClosePanel });
  const codemieEditForm = useCodemieEditForm({ handleClosePanel, codemie });

  const codemieSecretCreateForm = useCodemieSecretCreateForm({ handleClosePanel });
  const codemieSecretEditForm = useCodemieSecretEditForm({
    handleClosePanel,
    secret: codemieSecret,
  });

  const quickLinkFormData: FormItem = React.useMemo(
    () => ({
      mode: quickLinkFormMode,
      form: quickLinkEditForm.form,
      onSubmit: quickLinkEditForm.form.handleSubmit(quickLinkEditForm.handleSubmit),
      isSubmitting: quickLinkEditForm.mutation.isLoading,
    }),
    [
      quickLinkEditForm.form,
      quickLinkEditForm.handleSubmit,
      quickLinkEditForm.mutation.isLoading,
      quickLinkFormMode,
    ]
  );

  const codemieFormData: FormItem = React.useMemo(
    () =>
      codemieFormMode === FORM_MODES.CREATE
        ? {
            mode: FORM_MODES.CREATE,
            form: codemieCreateForm.form,
            onSubmit: codemieCreateForm.form.handleSubmit(codemieCreateForm.handleSubmit),
            isSubmitting: codemieCreateForm.mutation.isLoading,
          }
        : {
            mode: FORM_MODES.EDIT,
            form: codemieEditForm.form,
            onSubmit: codemieEditForm.form.handleSubmit(codemieEditForm.handleSubmit),
            isSubmitting: codemieEditForm.mutation.isLoading,
          },
    [
      codemieCreateForm.form,
      codemieCreateForm.handleSubmit,
      codemieCreateForm.mutation.isLoading,
      codemieEditForm.form,
      codemieEditForm.handleSubmit,
      codemieEditForm.mutation.isLoading,
      codemieFormMode,
    ]
  );

  const codemieSecretFormData: FormItem = React.useMemo(
    () =>
      codemieSecretFormMode === FORM_MODES.CREATE
        ? {
            mode: FORM_MODES.CREATE,
            form: codemieSecretCreateForm.form,
            onSubmit: codemieSecretCreateForm.form.handleSubmit(
              codemieSecretCreateForm.handleSubmit
            ),
            isSubmitting: codemieSecretCreateForm.mutation.isLoading,
          }
        : {
            mode: FORM_MODES.EDIT,
            form: codemieSecretEditForm.form,
            onSubmit: codemieSecretEditForm.form.handleSubmit(codemieSecretEditForm.handleSubmit),
            isSubmitting: codemieSecretEditForm.mutation.isLoading,
          },
    [
      codemieSecretCreateForm.form,
      codemieSecretCreateForm.handleSubmit,
      codemieSecretCreateForm.mutation.isLoading,
      codemieSecretEditForm.form,
      codemieSecretEditForm.handleSubmit,
      codemieSecretEditForm.mutation.isLoading,
      codemieSecretFormMode,
    ]
  );

  return (
    <div data-testid="form">
      <DataContextProvider
        quickLink={quickLink}
        codemie={codemie}
        codemieSecret={codemieSecret}
        handleClosePanel={handleClosePanel}
      >
        <MultiFormContextProvider<FormNames>
          forms={{
            quickLink: quickLinkFormData,
            codemie: codemieFormData,
            codemieSecret: codemieSecretFormData,
          }}
          sharedForm={null}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <QuickLinkForm />
            </Grid>
            <Grid item xs={12}>
              <CodemieForm />
            </Grid>
            <Grid item xs={12}>
              <CodemieSecretForm />
            </Grid>
            <Grid item xs={12}>
              <Actions />
            </Grid>
          </Grid>
        </MultiFormContextProvider>
      </DataContextProvider>
    </div>
  );
};
