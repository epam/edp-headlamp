import { Grid } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { GIT_PROVIDER } from '../../../../../../constants/gitProviders';
import { FormAutocompleteSingle } from '../../../../../../providers/Form/components/FormAutocompleteSingle';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { validateField, validationRules } from '../../../../../../utils/formFieldValidation';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';

const FROM_TYPE_OPTIONS = [
  {
    value: 'branch',
    label: 'Branch',
  },
  {
    value: 'commit',
    label: 'Commit Hash',
  },
];

export const FromCommit = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useTypedFormContext();

  const {
    props: { codebase },
    extra: { apiServiceBase, gitFusionApiService },
  } = useCurrentDialog();

  const codebaseGitUrlPath = codebase.spec.gitUrlPath;
  const codebaseGitServer = codebase.spec.gitServer;
  const codebaseRepoName = codebaseGitUrlPath.split('/').at(-1) || '';
  const codebaseOwner = codebaseGitUrlPath.split('/').filter(Boolean).slice(0, -1).join('/');

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
      enabled:
        !!apiServiceBase.apiBaseURL && !!codebaseGitServer && !!codebaseOwner && !!codebaseRepoName,
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

  const fromType = watch(CODEBASE_BRANCH_FORM_NAMES.fromType.name) || 'branch';

  const helperText = React.useMemo(() => {
    if (!apiServiceBase.apiBaseURL) {
      return 'Branches auto-discovery cannot be performed.';
    }

    if (query.isError) {
      return 'Branches auto-discovery could not be performed.';
    }

    return ' ';
  }, [apiServiceBase.apiBaseURL, query.isError]);

  const renderInputField = () => {
    if (fromType === 'branch') {
      return (
        <FormAutocompleteSingle
          {...register(CODEBASE_BRANCH_FORM_NAMES.fromCommit.name, {
            required: 'Enter branch name',
            validate: (value) => {
              return validateField(value, validationRules.BRANCH_NAME);
            },
          })}
          label="Branch name"
          placeholder="Select branch name"
          control={control}
          errors={errors}
          options={branchesOptions}
          disabled={query.isLoading}
          TextFieldProps={{
            helperText,
          }}
          AutocompleteProps={{
            loading: query.isLoading,
            freeSolo: true,
          }}
        />
      );
    } else {
      return (
        <FormTextField
          {...register(CODEBASE_BRANCH_FORM_NAMES.fromCommit.name, {
            required: 'Enter commit hash',
            pattern: {
              value: /^[a-fA-F0-9]{40}$/,
              message: 'Commit hash must be a full Git commit hash (40 hexadecimal characters)',
            },
            validate: (value) => {
              if (!value || value.trim() === '') {
                return true;
              }
              return true;
            },
          })}
          label="Commit hash"
          placeholder="Enter commit hash"
          control={control}
          errors={errors}
        />
      );
    }
  };

  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={6}>
        <FormSelect
          name={CODEBASE_BRANCH_FORM_NAMES.fromType.name}
          control={control}
          errors={errors}
          label="From"
          title="Choose whether to create the branch from an existing branch or a specific commit hash"
          options={FROM_TYPE_OPTIONS}
          defaultValue="branch"
        />
      </Grid>
      <Grid item xs={6}>
        {renderInputField()}
      </Grid>
    </Grid>
  );
};
