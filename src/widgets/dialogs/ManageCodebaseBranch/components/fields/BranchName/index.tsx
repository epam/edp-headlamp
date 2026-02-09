import { Icon } from '@iconify/react';
import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { Grid, IconButton } from '@mui/material';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { GIT_PROVIDER } from '../../../../../../constants/gitProviders';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useEDPConfigMapQuery } from '../../../../../../k8s/groups/default/ConfigMap/hooks/useEDPConfigMap';
import { FormAutocompleteSingle } from '../../../../../../providers/Form/components/FormAutocompleteSingle';
import { ApiServiceBase, GitFusionApiService } from '../../../../../../services/api';
import { FieldEvent } from '../../../../../../types/forms';
import { createVersioningString } from '../../../../../../utils/createVersioningString';
import { validateField, validationRules } from '../../../../../../utils/formFieldValidation';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { getToken } from '../../../../../../utils/getToken';
import { getVersionAndPostfixFromVersioningString } from '../../../../../../utils/getVersionAndPostfixFromVersioningString';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';
import { BranchNameProps } from './types';

export const BranchName = ({ defaultBranchVersion }: BranchNameProps) => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useTypedFormContext();

  const {
    props: { codebaseBranches, codebase },
    extra: { apiServiceBase, gitFusionApiService },
  } = useCurrentDialog();

  const { data: EDPConfigMap } = useEDPConfigMapQuery();
  const cluster = Utils.getCluster() || '';
  const token = getToken(cluster);
  const apiGatewayUrl = EDPConfigMap?.data?.api_gateway_url;

  const apiService = new ApiServiceBase(apiGatewayUrl, token);
  const opensearchApiService = new GitFusionApiService(apiService);

  const invalidateBranchListCacheMutation = useMutation(
    ['invalidateBranchListCacheMutation', getDefaultNamespace()],
    () =>
      apiService.createFetcher(
        opensearchApiService.getInvalidateBranchListCache(),
        undefined,
        'POST'
      )
  );

  const codebaseGitUrlPath = codebase.spec.gitUrlPath;
  const codebaseGitServer = codebase.spec.gitServer;
  const codebaseRepoName = codebaseGitUrlPath.split('/').at(-1) || '';
  const codebaseOwner = codebaseGitUrlPath.split('/').filter(Boolean).slice(0, -1).join('/');

  const canLoadBranches = React.useMemo(() => {
    return (
      !!apiServiceBase.apiBaseURL && !!codebaseGitServer && !!codebaseOwner && !!codebaseRepoName
    );
  }, [apiServiceBase.apiBaseURL, codebaseGitServer, codebaseOwner, codebaseRepoName]);

  const query = useQuery<{
    data: {
      name: string;
    }[];
  }>(
    ['branchList', codebaseGitServer, codebaseOwner, codebaseRepoName],
    () =>
      apiServiceBase.createFetcher(
        gitFusionApiService.getBranchListEndpoint(
          codebaseGitServer,
          codebaseOwner,
          codebaseRepoName
        )
      ),
    {
      enabled: canLoadBranches,
    }
  );

  const branchesOptions = React.useMemo(() => {
    if (query.isLoading || query.isError) {
      return [];
    }

    if (codebaseGitServer === GIT_PROVIDER.GERRIT) {
      return [
        {
          label: codebase.spec.defaultBranch,
          value: codebase.spec.defaultBranch,
        },
      ];
    }

    return (
      query.data?.data.map((branch) => ({
        label: branch.name,
        value: branch.name,
      })) || []
    );
  }, [
    query.isLoading,
    query.isError,
    query.data?.data,
    codebaseGitServer,
    codebase.spec.defaultBranch,
  ]);

  const existingCodebaseBranchs = codebaseBranches.map(
    (codebaseBranch) => codebaseBranch.spec.branchName
  );

  const releaseFieldValue = watch(CODEBASE_BRANCH_FORM_NAMES.release.name);

  const handleReleaseBranchNameFieldValueChange = React.useCallback(
    ({ target: { value } }: FieldEvent) => {
      const { release, releaseBranchVersionStart } = getValues();
      if (release || !defaultBranchVersion) {
        return;
      }

      const { postfix } = getVersionAndPostfixFromVersioningString(defaultBranchVersion);
      const newValue = value === '' ? postfix : `${value}-${postfix}`;

      setValue(CODEBASE_BRANCH_FORM_NAMES.releaseBranchVersionPostfix.name, newValue);
      setValue(
        CODEBASE_BRANCH_FORM_NAMES.version.name,
        createVersioningString(releaseBranchVersionStart, newValue)
      );
    },
    [defaultBranchVersion, getValues, setValue]
  );

  const handleRefreshBranches = React.useCallback(() => {
    invalidateBranchListCacheMutation.mutate(undefined, {
      onSuccess: () => {
        query.refetch();
      },
    });
  }, [invalidateBranchListCacheMutation, query]);

  const helperText = React.useMemo(() => {
    if (!apiServiceBase.apiBaseURL) {
      return 'Branches auto-discovery cannot be performed.';
    }

    if (query.isError) {
      return 'Branches auto-discovery could not be performed.';
    }

    return ' ';
  }, [apiServiceBase.apiBaseURL, query.isError]);

  return (
    <Grid item xs={12}>
      <FormAutocompleteSingle
        placeholder="Branch name"
        {...register(CODEBASE_BRANCH_FORM_NAMES.branchName.name, {
          required: 'Enter branch name',
          validate: (value) => {
            if (existingCodebaseBranchs.includes(value)) {
              return `Branch name "${value}" already exists`;
            }
            return validateField(value, validationRules.BRANCH_NAME);
          },
          onChange: handleReleaseBranchNameFieldValueChange,
        })}
        label="Branch Name"
        tooltipText={'Type the branch name that will be created in the Version Control System.'}
        control={control}
        errors={errors}
        options={branchesOptions}
        disabled={releaseFieldValue}
        AutocompleteProps={{
          freeSolo: true,
          loading: query.isLoading,
        }}
        TextFieldProps={{
          helperText,
          InputProps: {
            endAdornment: canLoadBranches ? (
              <>
                <IconButton
                  size="small"
                  onClick={handleRefreshBranches}
                  disabled={invalidateBranchListCacheMutation.isLoading || query.isLoading}
                  title="Refresh branches"
                  sx={{
                    color: 'inherit',
                  }}
                >
                  <Icon icon={ICONS.REFRESH} color="inherit" />
                </IconButton>
              </>
            ) : null,
          },
        }}
      />
    </Grid>
  );
};
