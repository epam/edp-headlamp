import { Grid } from '@mui/material';
import React from 'react';
import { MultiFormContextProvider } from '../../providers/MultiForm';
import { FormItem } from '../../providers/MultiForm/types';
import { FORM_MODES } from '../../types/forms';
import { Actions } from './components/Actions';
import { CredentialsForm } from './components/Credentials';
import { GitServerForm } from './components/GitServer';
import { useCredentialsCreateForm } from './hooks/useCredentialsCreateForm';
import { useCredentialsEditForm } from './hooks/useCredentialsEditForm';
import { useGitServerCreateForm } from './hooks/useGitServerCreateForm';
import { useGitServerEditForm } from './hooks/useGitServerEditForm';
import { useSharedForm } from './hooks/useSharedForm';
import { GIT_SERVER_FORM_NAMES } from './names';
import { DataContextProvider } from './providers/Data';
import { FormNames, ManageGitServerProps } from './types';
import { getGitServerSecret } from './utils';

const Form = ({ sharedForm, gitServerForm, credentialsForm, gitServerSecret }) => {
  return (
    <MultiFormContextProvider<FormNames>
      forms={{
        gitServer: gitServerForm,
        credentials: credentialsForm,
      }}
      sharedForm={sharedForm}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <GitServerForm />
        </Grid>
        <Grid item xs={12}>
          <CredentialsForm gitServerSecret={gitServerSecret} />
        </Grid>
        <Grid item xs={12}>
          <Actions />
        </Grid>
      </Grid>
    </MultiFormContextProvider>
  );
};

export const ManageGitServer = ({
  gitServer,
  repositorySecrets,
  handleClosePanel,
}: ManageGitServerProps) => {
  const gitServerFormMode = gitServer ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const { form: sharedForm } = useSharedForm({ gitServer });
  const gitProviderSharedValue = sharedForm.watch(GIT_SERVER_FORM_NAMES.gitProvider.name);

  const gitServerSecret = React.useMemo(
    () => getGitServerSecret(gitServer, repositorySecrets, gitProviderSharedValue),
    [gitProviderSharedValue, gitServer, repositorySecrets]
  );

  const credentialsFormMode = gitServerSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const {
    form: gitServerCreateForm,
    mutation: gitServerCreateMutation,
    handleSubmit: handleGitServerCreateSubmit,
  } = useGitServerCreateForm({ handleClosePanel });

  const {
    form: gitServerEditForm,
    mutation: gitServerEditMutation,
    handleSubmit: handleGitServerEditSubmit,
  } = useGitServerEditForm({ gitServer });

  const {
    form: credentialsCreateForm,
    mutation: credentialsCreateMutation,
    handleSubmit: handleCredentialsCreateSubmit,
  } = useCredentialsCreateForm({ chosenGitProvider: gitProviderSharedValue });

  const {
    form: credentialsEditForm,
    mutation: credentialsEditMutation,
    handleSubmit: handleCredentialsEditSubmit,
  } = useCredentialsEditForm({
    chosenGitProvider: gitProviderSharedValue,
    gitServerSecret,
  });

  const gitServerForm: FormItem = React.useMemo(
    () =>
      gitServerFormMode === FORM_MODES.CREATE
        ? {
            mode: FORM_MODES.CREATE,
            form: gitServerCreateForm,
            onSubmit: gitServerCreateForm.handleSubmit(handleGitServerCreateSubmit),
            isSubmitting: gitServerCreateMutation.isLoading,
          }
        : {
            mode: FORM_MODES.EDIT,
            form: gitServerEditForm,
            onSubmit: gitServerEditForm.handleSubmit(handleGitServerEditSubmit),
            isSubmitting: gitServerEditMutation.isLoading,
          },
    [
      gitServerCreateForm,
      gitServerCreateMutation.isLoading,
      gitServerEditForm,
      gitServerEditMutation.isLoading,
      gitServerFormMode,
      handleGitServerCreateSubmit,
      handleGitServerEditSubmit,
    ]
  );

  const credentialsForm: FormItem = React.useMemo(
    () =>
      credentialsFormMode === FORM_MODES.CREATE
        ? {
            mode: FORM_MODES.CREATE,
            form: credentialsCreateForm,
            onSubmit: credentialsCreateForm.handleSubmit(handleCredentialsCreateSubmit),
            isSubmitting: credentialsCreateMutation.isLoading,
          }
        : {
            mode: FORM_MODES.EDIT,
            form: credentialsEditForm,
            onSubmit: credentialsEditForm.handleSubmit(handleCredentialsEditSubmit),
            isSubmitting: credentialsEditMutation.isLoading,
          },
    [
      credentialsCreateForm,
      credentialsCreateMutation.isLoading,
      credentialsEditForm,
      credentialsEditMutation.isLoading,
      credentialsFormMode,
      handleCredentialsCreateSubmit,
      handleCredentialsEditSubmit,
    ]
  );

  return (
    <DataContextProvider gitServer={gitServer} gitServerSecret={gitServerSecret}>
      <Form
        sharedForm={sharedForm}
        gitServerForm={gitServerForm}
        credentialsForm={credentialsForm}
        gitServerSecret={gitServerSecret}
      />
    </DataContextProvider>
  );
};
