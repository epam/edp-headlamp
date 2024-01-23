import React from 'react';
import { GIT_SERVER_FORM_NAMES } from '../../../names';

export const useDefaultValues = () => {
  return React.useMemo(() => {
    return {
      [GIT_SERVER_FORM_NAMES.sshPort.name]: 22,
      [GIT_SERVER_FORM_NAMES.httpsPort.name]: 443,
    };
  }, []);
};
