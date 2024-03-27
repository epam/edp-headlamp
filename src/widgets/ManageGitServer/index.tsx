import { Grid } from '@mui/material';
import React from 'react';
import { GIT_PROVIDERS } from '../../constants/gitProviders';
import { MultiFormContextProvider } from '../../providers/MultiForm';
import { FORM_MODES } from '../../types/forms';
import { Actions } from './components/Actions';
import { CredentialsForm } from './components/Credentials';
import { GitServerForm } from './components/GitServer';
import { DataContextProvider } from './providers/Data';
import { ManageGitServerProps } from './types';
import { getGitServerSecret } from './utils/getGitServerSecret';

export const ManageGitServer = ({
  gitServer,
  repositorySecrets,
  handleClosePanel,
}: ManageGitServerProps) => {
  const [chosenGitProvider, setChosenGitProvider] = React.useState<GIT_PROVIDERS>(
    GIT_PROVIDERS.GERRIT
  );

  const gitServerSecret = React.useMemo(
    () => getGitServerSecret(gitServer, repositorySecrets, chosenGitProvider),
    [chosenGitProvider, gitServer, repositorySecrets]
  );

  const gitServerFormMode = gitServer ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const credentialsFormMode = gitServerSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const gitServerFormRef = React.useRef<HTMLFormElement>(null);
  const credentialsFormRef = React.useRef<HTMLFormElement>(null);

  return (
    <DataContextProvider
      gitServer={gitServer}
      gitServerSecret={gitServerSecret}
      gitServerFormMode={gitServerFormMode}
      credentialsFormMode={credentialsFormMode}
      chosenGitProvider={chosenGitProvider}
      setChosenGitProvider={setChosenGitProvider}
      handleClosePanel={handleClosePanel}
    >
      <MultiFormContextProvider>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <GitServerForm mode={gitServerFormMode} formRef={gitServerFormRef} />
          </Grid>
          <Grid item xs={12}>
            <CredentialsForm
              mode={credentialsFormMode}
              gitServerSecret={gitServerSecret}
              formRef={credentialsFormRef}
            />
          </Grid>
          <Grid item xs={12}>
            <Actions formRefs={[gitServerFormRef, credentialsFormRef]} />
          </Grid>
        </Grid>
      </MultiFormContextProvider>
    </DataContextProvider>
  );
};
