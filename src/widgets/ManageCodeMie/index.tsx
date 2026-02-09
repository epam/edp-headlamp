import { Grid } from '@mui/material';
import React from 'react';
import { MultiFormContextProvider } from '../../providers/MultiForm/provider';
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
  permissions,
  handleClosePanel,
}: ManageCodeMieProps) => {
  const quickLinkEditForm = useQuickLinkEditForm({
    quickLink,
    permissions,
  });

  const codemieCreateForm = useCodemieCreateForm({ handleClosePanel, permissions });
  const codemieEditForm = useCodemieEditForm({ handleClosePanel, codemie, permissions });

  const codemieSecretCreateForm = useCodemieSecretCreateForm({ handleClosePanel, permissions });
  const codemieSecretEditForm = useCodemieSecretEditForm({
    handleClosePanel,
    secret: codemieSecret,
    permissions,
  });

  const codemieForm = codemie ? codemieEditForm : codemieCreateForm;

  const codemieSecretForm = codemieSecret ? codemieSecretEditForm : codemieSecretCreateForm;

  return (
    <div data-testid="form">
      <DataContextProvider
        quickLink={quickLink}
        codemie={codemie}
        codemieSecret={codemieSecret}
        permissions={permissions}
        handleClosePanel={handleClosePanel}
      >
        <MultiFormContextProvider<FormNames>
          forms={{
            quickLink: quickLinkEditForm,
            codemie: codemieForm,
            codemieSecret: codemieSecretForm,
          }}
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
