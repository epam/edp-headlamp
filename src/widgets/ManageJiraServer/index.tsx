import { Grid } from '@mui/material';
import React from 'react';
import { MultiFormContextProvider } from '../../providers/MultiForm';
import { FormItem } from '../../providers/MultiForm/types';
import { FORM_MODES } from '../../types/forms';
import { Actions } from './components/Actions';
import { JiraServerForm } from './components/JiraServer';
import { SecretForm } from './components/Secret';
import { useJiraServerCreateForm } from './hooks/useJiraServerCreateForm';
import { useJiraServerEditForm } from './hooks/useJiraServerEditForm';
import { useSecretCreateForm } from './hooks/useSecretCreateForm';
import { useSecretEditForm } from './hooks/useSecretEditForm';
import { DataContextProvider } from './providers/Data';
import { FormNames, ManageJiraServerProps } from './types';

export const ManageJiraServer = ({
  jiraServer,
  secret,
  ownerReference,
  handleClosePanel,
}: ManageJiraServerProps) => {
  const secretFormMode = secret ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const jiraServerFormMode = jiraServer ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const secretCreateForm = useSecretCreateForm({ handleClosePanel });

  const secretEditForm = useSecretEditForm({ handleClosePanel, secret });

  const jiraServerEditForm = useJiraServerEditForm({
    jiraServer,
    handleClosePanel,
  });

  const jiraServerCreateForm = useJiraServerCreateForm({ handleClosePanel });

  const jiraServerFormData: FormItem = React.useMemo(
    () =>
      jiraServerFormMode === FORM_MODES.CREATE
        ? {
            mode: jiraServerFormMode,
            form: jiraServerCreateForm.form,
            onSubmit: jiraServerCreateForm.form.handleSubmit(jiraServerCreateForm.handleSubmit),
            isSubmitting: jiraServerCreateForm.mutation.isLoading,
          }
        : {
            mode: jiraServerFormMode,
            form: jiraServerEditForm.form,
            onSubmit: jiraServerEditForm.form.handleSubmit(jiraServerEditForm.handleSubmit),
            isSubmitting: jiraServerEditForm.mutation.isLoading,
          },
    [
      jiraServerCreateForm.form,
      jiraServerCreateForm.handleSubmit,
      jiraServerCreateForm.mutation.isLoading,
      jiraServerEditForm.form,
      jiraServerEditForm.handleSubmit,
      jiraServerEditForm.mutation.isLoading,
      jiraServerFormMode,
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
        jiraServer={jiraServer}
        ownerReference={ownerReference}
        handleClosePanel={handleClosePanel}
      >
        <MultiFormContextProvider<FormNames>
          forms={{
            jiraServer: jiraServerFormData,
            secret: secretFormData,
          }}
          sharedForm={null}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <JiraServerForm />
            </Grid>
            <Grid item xs={12}>
              <SecretForm />
            </Grid>
            <Grid item xs={12}>
              <Actions handleCloseCreateDialog={handleClosePanel} />
            </Grid>
          </Grid>
        </MultiFormContextProvider>
      </DataContextProvider>
    </div>
  );
};
