import React from 'react';
import { useQuery } from 'react-query';
import { FormAutocompleteSingle } from '../../../../../../providers/Form/components/FormAutocompleteSingle';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';

export const Owner = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useTypedFormContext();

  const gitServerFieldValue = watch(CODEBASE_FORM_NAMES.gitServer.name);

  const { apiServiceBase, gitFusionApiService } = useCurrentDialog();

  const query = useQuery<{
    data: {
      default_branch: string;
      description: string;
      id: string;
      name: string;
      owner: string;
      url: string;
    }[];
  }>(
    ['organizationList', gitServerFieldValue],
    () =>
      apiServiceBase.createFetcher(
        gitFusionApiService.getOrganizationsEndpoint(gitServerFieldValue)
      ),
    {
      enabled: !!apiServiceBase.apiBaseURL && !!gitServerFieldValue,
    }
  );

  const organizationsOptions = React.useMemo(() => {
    if (query.isLoading || query.isError || !query.data) {
      return [];
    }

    return (
      query.data.data?.map(({ name }) => ({
        label: name,
        value: name,
      })) || []
    );
  }, [query.data, query.isError, query.isLoading]);


  return (
    <FormAutocompleteSingle
      placeholder={'Owner'}
      {...register(CODEBASE_FORM_NAMES.repositoryOwner.name, {
        required: 'Select/Enter owner',
      })}
      label={'Owner'}
      control={control}
      errors={errors}
      options={organizationsOptions}
      AutocompleteProps={{
        freeSolo: true,
        loading: !!apiServiceBase.apiBaseURL && query.isLoading,
      }}
      TextFieldProps={{
        helperText: !apiServiceBase.apiBaseURL ? 'Owners auto-discovery cannot be performed.' : ' ',
      }}
    />
  );
};
