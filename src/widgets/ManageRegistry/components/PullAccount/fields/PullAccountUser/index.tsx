import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useRegistryFormsContext } from '../../../../hooks/useRegistryFormsContext';
import { PULL_ACCOUNT_FORM_NAMES } from '../../../../names';
import { useDataContext } from '../../../../providers/Data/hooks';

export const PullAccountUser = () => {
  const {
    forms: { pullAccount },
  } = useRegistryFormsContext();

  const { pullAccountSecret } = useDataContext();

  const ownerReference = pullAccountSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <FormTextField
      {...pullAccount.form.register(PULL_ACCOUNT_FORM_NAMES.pullAccountUser.name, {
        required: 'Enter user name',
      })}
      label={`User`}
      title={'Provide the unique identifier linked to your user account on the container registry.'}
      placeholder={'Enter user name'}
      control={pullAccount.form.control}
      errors={pullAccount.form.formState.errors}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
      disabled={!!ownerReference}
    />
  );
};
