import { Grid } from '@mui/material';
import React from 'react';
import { MultiFormContextProvider } from '../../providers/MultiForm/provider';
import { Actions } from './components/Actions';
import { QuickLinkForm } from './components/QuickLink';
import { SecretForm } from './components/Secret';
import { useQuickLinkEditForm } from './hooks/useQuickLinkEditForm';
import { useSecretCreateForm } from './hooks/useSecretCreateForm';
import { useSecretEditForm } from './hooks/useSecretEditForm';
import { DataContextProvider } from './providers/Data';
import { FormNames, ManageDepTrackCIProps } from './types';

export const ManageDependencyTrack = ({
  quickLink,
  secret,
  mode,
  ownerReference,
  permissions,
  handleClosePanel,
}: ManageDepTrackCIProps) => {
  const secretCreateForm = useSecretCreateForm({ handleClosePanel, permissions });

  const secretEditForm = useSecretEditForm({ handleClosePanel, secret, permissions });

  const quickLinkEditForm = useQuickLinkEditForm({
    quickLink,
    permissions,
  });

  const secretForm = secret ? secretEditForm : secretCreateForm;

  return (
    <div data-testid="form">
      <DataContextProvider
        secret={secret}
        quickLink={quickLink}
        mode={mode}
        ownerReference={ownerReference}
        permissions={permissions}
        handleClosePanel={handleClosePanel}
      >
        <MultiFormContextProvider<FormNames>
          forms={{
            quickLink: quickLinkEditForm,
            secret: secretForm,
          }}
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
