import React from 'react';
import { FormTextFieldEditable } from '../../../../../../../providers/Form/components/FormTextFieldEditable';
import { FORM_MODES } from '../../../../../../../types/forms';
import { useFormsContext } from '../../../../../hooks/useFormsContext';
import { GIT_SERVER_FORM_NAMES } from '../../../../../names';
import { useDataContext } from '../../../../../providers/Data/hooks';

export const UserName = () => {
  const { gitServerSecret } = useDataContext();

  const {
    forms: { gitServer: gitServerForm },
  } = useFormsContext();

  const gitServerSecretOwnerReference = gitServerSecret?.metadata?.ownerReferences?.[0].kind;

  return (
    <FormTextFieldEditable
      {...gitServerForm.form.register(GIT_SERVER_FORM_NAMES.gitUser.name, {
        required: 'Enter the username associated with your Git account.',
      })}
      label={'User'}
      title={'Provide the username associated with your Git account.'}
      placeholder={'git'}
      control={gitServerForm.form.control}
      errors={gitServerForm.form.formState.errors}
      disabled={gitServerForm.mode === FORM_MODES.EDIT && !!gitServerSecretOwnerReference}
    />
  );
};
