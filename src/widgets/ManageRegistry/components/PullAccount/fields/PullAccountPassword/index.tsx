import React from 'react';
import { FormTextFieldPassword } from '../../../../../../providers/Form/components/FormTextFieldPassword';
import { useRegistryFormsContext } from '../../../../hooks/useRegistryFormsContext';
import { PULL_ACCOUNT_FORM_NAMES } from '../../../../names';
import { useDataContext } from '../../../../providers/Data/hooks';

export const PullAccountPassword = () => {
  const {
    forms: { pullAccount },
  } = useRegistryFormsContext();

  const { pullAccountSecret } = useDataContext();

  const ownerReference = pullAccountSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <FormTextFieldPassword
      {...pullAccount.form.register(PULL_ACCOUNT_FORM_NAMES.pullAccountPassword.name, {
        required: 'Enter password or token',
      })}
      label={`Password / Token`}
      title={
        'Enter the confidential combination used for authenticating your access to the container registry.'
      }
      placeholder={'Enter password or token'}
      control={pullAccount.form.control}
      errors={pullAccount.form.formState.errors}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
      disabled={!!ownerReference}
    />
  );
};
