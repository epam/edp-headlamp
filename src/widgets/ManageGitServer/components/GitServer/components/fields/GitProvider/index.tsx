import React from 'react';
import { GIT_PROVIDER_ICON_MAPPING } from '../../../../../../../configs/icon-mappings';
import { gitProviderOptions } from '../../../../../../../configs/select-options/gitProviders';
import {
  GIT_PROVIDER,
  GitProvider as GitProviderType,
} from '../../../../../../../constants/gitProviders';
import { Resources } from '../../../../../../../icons/sprites/Resources';
import { RESOURCE_ICON_NAMES } from '../../../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../../../icons/UseSpriteSymbol';
import { FormRadioGroup } from '../../../../../../../providers/Form/components/FormRadioGroup';
import { FieldEvent, FORM_MODES } from '../../../../../../../types/forms';
import { GIT_USER } from '../../../../../constants';
import { useFormsContext } from '../../../../../hooks/useFormsContext';
import { GIT_SERVER_FORM_NAMES } from '../../../../../names';

export const GitProvider = () => {
  const {
    forms: { gitServer: gitServerForm },
    sharedForm,
  } = useFormsContext();

  const handleFieldValueChange = React.useCallback(
    ({ target: { value } }: FieldEvent) => {
      sharedForm.setValue(GIT_SERVER_FORM_NAMES.gitProvider.name, value, { shouldDirty: false });

      if (gitServerForm.form.formState.dirtyFields?.gitUser) {
        return value;
      }

      switch (value) {
        case GIT_PROVIDER.GERRIT:
          gitServerForm.form.setValue(GIT_SERVER_FORM_NAMES.gitUser.name, GIT_USER.GERRIT);
          break;
        case GIT_PROVIDER.GITHUB:
          gitServerForm.form.setValue(GIT_SERVER_FORM_NAMES.gitUser.name, GIT_USER.GITHUB);
          break;
        case GIT_PROVIDER.GITLAB:
          gitServerForm.form.setValue(GIT_SERVER_FORM_NAMES.gitUser.name, GIT_USER.GITLAB);
          break;
        case GIT_PROVIDER.BITBUCKET:
          gitServerForm.form.setValue(GIT_SERVER_FORM_NAMES.gitUser.name, GIT_USER.BITBUCKET);
          break;
      }
    },
    [gitServerForm.form, sharedForm]
  );

  return (
    <>
      <Resources />
      <FormRadioGroup
        {...gitServerForm.form.register(GIT_SERVER_FORM_NAMES.gitProvider.name, {
          required: 'Select your Git provider.',
          onChange: handleFieldValueChange,
        })}
        control={gitServerForm.form.control}
        errors={gitServerForm.form.formState.errors}
        label={'Git provider'}
        title={'Select your Git provider.'}
        options={gitProviderOptions.map(({ label, value }) => {
          return {
            value,
            label,
            icon: (
              <UseSpriteSymbol
                name={
                  GIT_PROVIDER_ICON_MAPPING?.[value as GitProviderType] || RESOURCE_ICON_NAMES.OTHER
                }
                width={20}
                height={20}
              />
            ),
            checkedIcon: (
              <UseSpriteSymbol
                name={
                  GIT_PROVIDER_ICON_MAPPING?.[value as GitProviderType] || RESOURCE_ICON_NAMES.OTHER
                }
                width={20}
                height={20}
              />
            ),
          };
        })}
        disabled={gitServerForm.mode === FORM_MODES.EDIT}
      />
    </>
  );
};
