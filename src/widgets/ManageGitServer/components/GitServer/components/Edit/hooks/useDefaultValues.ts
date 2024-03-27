import React from 'react';
import { useDataContext } from '../../../../../providers/Data/hooks';
import { GIT_SERVER_FORM_NAMES } from '../../../names';

export const useDefaultValues = () => {
  const { gitServer } = useDataContext();

  return React.useMemo(
    () => ({
      [GIT_SERVER_FORM_NAMES.name.name]: gitServer.metadata.name,
      [GIT_SERVER_FORM_NAMES.sshPort.name]: gitServer.spec.sshPort
        ? Number(gitServer.spec.sshPort)
        : undefined,
      [GIT_SERVER_FORM_NAMES.httpsPort.name]: gitServer.spec.httpsPort
        ? Number(gitServer.spec.httpsPort)
        : undefined,
      [GIT_SERVER_FORM_NAMES.gitUser.name]: gitServer.spec.gitUser,
      [GIT_SERVER_FORM_NAMES.gitHost.name]: gitServer.spec.gitHost,
      [GIT_SERVER_FORM_NAMES.gitProvider.name]: gitServer.spec.gitProvider,
      [GIT_SERVER_FORM_NAMES.skipWebhookSSLVerification.name]:
        gitServer.spec.skipWebhookSSLVerification,
    }),
    [
      gitServer.metadata.name,
      gitServer.spec.gitHost,
      gitServer.spec.gitProvider,
      gitServer.spec.gitUser,
      gitServer.spec.httpsPort,
      gitServer.spec.skipWebhookSSLVerification,
      gitServer.spec.sshPort,
    ]
  );
};
