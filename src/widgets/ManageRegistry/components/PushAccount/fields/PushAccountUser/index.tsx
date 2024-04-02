import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../../types/forms';
import { useRegistryFormsContext } from '../../../../hooks/useRegistryFormsContext';
import {
  PULL_ACCOUNT_FORM_NAMES,
  PUSH_ACCOUNT_FORM_NAMES,
  SHARED_FORM_NAMES,
} from '../../../../names';
import { useDataContext } from '../../../../providers/Data/hooks';

export const PushAccountUser = () => {
  const {
    forms: { pushAccount, pullAccount },
    sharedForm,
  } = useRegistryFormsContext();

  const { pushAccountSecret } = useDataContext();

  const useSameAccountFieldValue = sharedForm.watch(SHARED_FORM_NAMES.useSameAccount.name);

  const ownerReference = pushAccountSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <FormTextField
      {...pushAccount.form.register(PUSH_ACCOUNT_FORM_NAMES.pushAccountUser.name, {
        required: 'Enter user name',
        onChange: ({ target: { value } }: FieldEvent) => {
          if (!useSameAccountFieldValue) {
            return;
          }

          pullAccount.form.setValue(PULL_ACCOUNT_FORM_NAMES.pullAccountUser.name, value, {
            shouldDirty: true,
          });
        },
      })}
      label={`User`}
      title={'Provide the unique identifier linked to your user account on the container registry.'}
      placeholder={'Enter user name'}
      control={pushAccount.form.control}
      errors={pushAccount.form.formState.errors}
      TextFieldProps={{
        helperText: ownerReference && `This field value is managed by ${ownerReference}`,
      }}
      disabled={!!ownerReference}
    />
  );
};
