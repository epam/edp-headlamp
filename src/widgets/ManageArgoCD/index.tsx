import { Grid } from '@mui/material';
import React from 'react';
import { MultiFormContextProvider } from '../../providers/MultiForm';
import { FormItem } from '../../providers/MultiForm/types';
import { FORM_MODES } from '../../types/forms';
import { Actions } from './components/Actions';
import { QuickLinkForm } from './components/QuickLink';
import { SecretForm } from './components/Secret';
import { useQuickLinkEditForm } from './hooks/useQuickLinkEditForm';
import { useSecretCreateForm } from './hooks/useSecretCreateForm';
import { useSecretEditForm } from './hooks/useSecretEditForm';
import { DataContextProvider } from './providers/Data';
import { FormNames, ManageNexusCIProps } from './types';

export const ManageArgoCD = ({
  quickLink,
  secret,
  mode,
  ownerReference,
  handleClosePanel,
}: ManageNexusCIProps) => {
  const secretFormMode = secret ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const quickLinkFormMode = FORM_MODES.EDIT;

  const secretCreateForm = useSecretCreateForm({ handleClosePanel });

  const secretEditForm = useSecretEditForm({ handleClosePanel, secret });

  const quickLinkEditForm = useQuickLinkEditForm({
    quickLink,
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

  const secretFormData: FormItem = React.useMemo(
    () =>
      secretFormMode === FORM_MODES.CREATE
        ? {
            mode: FORM_MODES.CREATE,
            form: secretCreateForm.form,
            onSubmit: secretCreateForm.form.handleSubmit(secretCreateForm.handleSubmit),
            isSubmitting: secretCreateForm.mutation.isLoading,
          }
        : {
            mode: FORM_MODES.EDIT,
            form: secretEditForm.form,
            onSubmit: secretEditForm.form.handleSubmit(secretEditForm.handleSubmit),
            isSubmitting: secretEditForm.mutation.isLoading,
          },
    [
      secretCreateForm.form,
      secretCreateForm.handleSubmit,
      secretCreateForm.mutation.isLoading,
      secretEditForm.form,
      secretEditForm.handleSubmit,
      secretEditForm.mutation.isLoading,
      secretFormMode,
    ]
  );

  return (
    <div data-testid="form">
      <DataContextProvider
        secret={secret}
        quickLink={quickLink}
        mode={mode}
        ownerReference={ownerReference}
        handleClosePanel={handleClosePanel}
      >
        <MultiFormContextProvider<FormNames>
          forms={{
            quickLink: quickLinkFormData,
            secret: secretFormData,
          }}
          sharedForm={null}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <QuickLinkForm />
            </Grid>
            <Grid item xs={12}>
              <SecretForm />
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
