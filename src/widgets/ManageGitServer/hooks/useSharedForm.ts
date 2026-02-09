import React from 'react';
import { useForm } from 'react-hook-form';
import { GIT_PROVIDER } from '../../../constants/gitProviders';
import { GitServerKubeObjectInterface } from '../../../k8s/groups/EDP/GitServer/types';
import { GIT_USER } from '../constants';
import { SHARED_FORM_NAMES } from '../names';
import { SharedFormValues } from '../types';

export const useSharedForm = ({
  gitServer,
}: {
  gitServer: GitServerKubeObjectInterface | undefined;
}) => {
  const defaultValues = React.useMemo(() => {
    const gitProvider = gitServer?.spec.gitProvider || GIT_PROVIDER.GERRIT;
    const gitUser = (() => {
      switch (gitProvider) {
        case GIT_PROVIDER.GERRIT:
          return GIT_USER.GERRIT;
        case GIT_PROVIDER.GITHUB:
          return GIT_USER.GITHUB;
        case GIT_PROVIDER.GITLAB:
          return GIT_USER.GITLAB;
        case GIT_PROVIDER.BITBUCKET:
          return GIT_USER.BITBUCKET;
      }
    })();

    return {
      [SHARED_FORM_NAMES.gitProvider.name]: gitProvider,
      [SHARED_FORM_NAMES.gitUser.name]: gitUser,
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
