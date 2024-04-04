import React from 'react';
import { useForm } from 'react-hook-form';
import { GIT_PROVIDERS } from '../../../constants/gitProviders';
import { EDPGitServerKubeObjectInterface } from '../../../k8s/EDPGitServer/types';
import { SHARED_FORM_NAMES } from '../names';
import { SharedFormValues } from '../types';

export const useSharedForm = ({ gitServer }: { gitServer: EDPGitServerKubeObjectInterface }) => {
  const defaultValues = React.useMemo(() => {
    return {
      [SHARED_FORM_NAMES.gitProvider.name]: gitServer
        ? gitServer.spec.gitProvider
        : GIT_PROVIDERS.GERRIT,
    };
  }, [gitServer]);

  const form = useForm<SharedFormValues>({
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues, { keepDirty: false });
  }, [defaultValues, form]);

  return React.useMemo(() => ({ form }), [form]);
};
