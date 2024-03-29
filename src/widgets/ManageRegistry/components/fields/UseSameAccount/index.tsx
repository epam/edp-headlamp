import React from 'react';
import { FormCheckbox } from '../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { FieldEvent } from '../../../../../types/forms';
import { useRegistryFormsContext } from '../../../hooks/useRegistryFormsContext';
import {
  PULL_ACCOUNT_FORM_NAMES,
  PUSH_ACCOUNT_FORM_NAMES,
  SHARED_FORM_NAMES,
} from '../../../names';

export const UseSameAccount = () => {
  const {
    forms: { pushAccount, pullAccount },
    sharedForm,
  } = useRegistryFormsContext();

  const pushAccountUserNameFieldValue = pushAccount.form.watch(
    PUSH_ACCOUNT_FORM_NAMES.pushAccountUser.name
  );
  const pushAccountPasswordFieldValue = pushAccount.form.watch(
    PUSH_ACCOUNT_FORM_NAMES.pushAccountPassword.name
  );

  return (
    <FormCheckbox
      {...sharedForm.register(SHARED_FORM_NAMES.useSameAccount.name, {
        onChange: ({ target: { value } }: FieldEvent) => {
          if (value) {
            pullAccount.form.setValue(
              PULL_ACCOUNT_FORM_NAMES.pullAccountUser.name,
              pushAccountUserNameFieldValue,
              {
                shouldDirty: true,
              }
            );
            pullAccount.form.setValue(
              PULL_ACCOUNT_FORM_NAMES.pullAccountPassword.name,
              pushAccountPasswordFieldValue,
              {
                shouldDirty: true,
              }
            );
          }
        },
      })}
      label={
        <FormControlLabelWithTooltip
          label={`Use the Push Account's credentials`}
          title={'Enables using the same account for both pull and push purposes.'}
        />
      }
      control={sharedForm.control}
      errors={sharedForm.formState.errors}
    />
  );
};
