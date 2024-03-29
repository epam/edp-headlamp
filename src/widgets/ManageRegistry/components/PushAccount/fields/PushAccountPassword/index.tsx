import React from 'react';
import { FormTextFieldPassword } from '../../../../../../providers/Form/components/FormTextFieldPassword';
import { FieldEvent } from '../../../../../../types/forms';
import { useRegistryFormsContext } from '../../../../hooks/useRegistryFormsContext';
import {
  PULL_ACCOUNT_FORM_NAMES,
  PUSH_ACCOUNT_FORM_NAMES,
  SHARED_FORM_NAMES,
} from '../../../../names';
import { useDataContext } from '../../../../providers/Data/hooks';

export const PushAccountPassword = () => {
  const {
    forms: { pushAccount, pullAccount },
    sharedForm,
  } = useRegistryFormsContext();

  const { pushAccountSecret } = useDataContext();

  const useSameAccountFieldValue = sharedForm.watch(SHARED_FORM_NAMES.useSameAccount.name);

  const ownerReference = pushAccountSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <FormTextFieldPassword
      {...pushAccount.form.register(PUSH_ACCOUNT_FORM_NAMES.pushAccountPassword.name, {
        required: 'Enter password or token',
        onChange: ({ target: { value } }: FieldEvent) => {
          if (!useSameAccountFieldValue) {
            return;
          }

          pullAccount.form.setValue(PULL_ACCOUNT_FORM_NAMES.pullAccountPassword.name, value, {
            shouldDirty: true,
          });
        },
      })}
      label={`Password / Token`}
      title={
        'Enter the confidential combination used for authenticating your access to the container registry.'
      }
      placeholder={'Enter password or token'}
      control={pushAccount.form.control}
      errors={pushAccount.form.formState.errors}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
      disabled={!!ownerReference}
    />
  );
};
