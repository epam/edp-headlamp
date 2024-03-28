import React from 'react';
import { useForm } from 'react-hook-form';
import { GIT_PROVIDERS } from '../../../constants/gitProviders';
import { EDPGitServerKubeObjectInterface } from '../../../k8s/EDPGitServer/types';
import { GIT_SERVER_FORM_NAMES } from '../names';
import { GitServerFormValues } from '../types';

export const useSharedForm = ({ gitServer }: { gitServer: EDPGitServerKubeObjectInterface }) => {
  const form = useForm<GitServerFormValues>({
    defaultValues: {
      [GIT_SERVER_FORM_NAMES.gitProvider.name]: gitServer
        ? gitServer.spec.gitProvider
        : GIT_PROVIDERS.GERRIT,
    },
  });

  return React.useMemo(() => ({ form }), [form]);
};
