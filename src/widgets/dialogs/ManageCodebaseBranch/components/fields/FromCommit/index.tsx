import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { FormAutocompleteSingle } from '../../../../../../providers/Form/components/FormAutocompleteSingle';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
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
    return (
      query.data?.data.map((branch) => ({
        label: branch.name,
        value: branch.name,
      })) || []
    );
  }, [query.isLoading, query.isError, query.data]);

  const fromType = watch(CODEBASE_BRANCH_FORM_NAMES.fromType.name) || 'branch';

  const renderInputField = () => {
    if (fromType === 'branch') {
      return (
        <FormAutocompleteSingle
          {...register(CODEBASE_BRANCH_FORM_NAMES.fromCommit.name, {
            required: 'Enter branch name',
            pattern: {
              value: /^(?![\/\.\-])[A-Za-z0-9\/\._\-]*(?<![\/\.\-])$/,
              message: `Branch name may contain: upper-case and lower-case letters, numbers, slashes (/), dashes (-), dots (.), and underscores (_).
                        It cannot start or end with a slash (/), dot (.), or dash (-). Consecutive special characters are not allowed.
                        Minimum 2 characters.`,
            },
            validate: (value) => {
              if (!value || value.trim() === '') {
                return true;
              }
              if (value.length < 2) {
                return 'Branch name must be at least 2 characters long';
              }
              return true;
            },
          })}
          label="Branch name"
          placeholder="Select branch name"
          control={control}
          errors={errors}
          options={branchesOptions}
          disabled={query.isLoading || query.isError}
          TextFieldProps={{
            helperText: query.error ? query.error.toString() : '',
            error: !!query.error,
          }}
          InputProps={{
            endAdornment: query.isLoading ? <CircularProgress size={15} /> : null,
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
