import { Grid } from '@mui/material';
import React from 'react';
import { MultiFormContextProvider } from '../../providers/MultiForm/provider';
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
  permissions,
  handleClosePanel,
}: ManageJiraServerProps) => {
  const secretCreateForm = useSecretCreateForm({ handleClosePanel, permissions });

  const secretEditForm = useSecretEditForm({ handleClosePanel, secret, permissions });

  const jiraServerEditForm = useJiraServerEditForm({
    jiraServer,
    handleClosePanel,
    permissions,
  });

  const jiraServerCreateForm = useJiraServerCreateForm({ handleClosePanel, permissions });

  const jiraServerForm = jiraServer ? jiraServerEditForm : jiraServerCreateForm;

  const secretForm = secret ? secretEditForm : secretCreateForm;

  return (
    <div data-testid="form">
      <DataContextProvider
        secret={secret}
        jiraServer={jiraServer}
        ownerReference={ownerReference}
        permissions={permissions}
        handleClosePanel={handleClosePanel}
      >
        <MultiFormContextProvider<FormNames>
          forms={{
            jiraServer: jiraServerForm,
            secret: secretForm,
          }}
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
