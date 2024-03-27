import React from 'react';
import { GIT_PROVIDERS } from '../../../../../../../constants/gitProviders';
import { safeDecode } from '../../../../../../../utils/decodeEncode';
import { useDataContext } from '../../../../../providers/Data/hooks';
import { CREDENTIALS_FORM_NAME } from '../../../names';
import { CredentialsFormValues } from '../../../types';

export const useDefaultValues = () => {
  const { chosenGitProvider, gitServerSecret } = useDataContext();

  return React.useMemo(() => {
    let base: Partial<CredentialsFormValues> = {};

    if (chosenGitProvider === GIT_PROVIDERS.GERRIT) {
      base = {
        ...base,
        [CREDENTIALS_FORM_NAME.sshPrivateKey.name]: safeDecode(gitServerSecret?.data['id_rsa']),
        [CREDENTIALS_FORM_NAME.sshPublicKey.name]: safeDecode(gitServerSecret?.data['id_rsa.pub']),
      };
    }

    if (chosenGitProvider === GIT_PROVIDERS.GITLAB) {
      base = {
        ...base,
        [CREDENTIALS_FORM_NAME.sshPrivateKey.name]: safeDecode(gitServerSecret?.data['id_rsa']),
        [CREDENTIALS_FORM_NAME.token.name]: safeDecode(gitServerSecret?.data.token),
      };
    }

    if (chosenGitProvider === GIT_PROVIDERS.GITHUB) {
      base = {
        ...base,
        [CREDENTIALS_FORM_NAME.sshPrivateKey.name]: safeDecode(gitServerSecret?.data['id_rsa']),
        [CREDENTIALS_FORM_NAME.token.name]: safeDecode(gitServerSecret?.data.token),
      };
    }

    return base;
  }, [chosenGitProvider, gitServerSecret?.data]);
};
