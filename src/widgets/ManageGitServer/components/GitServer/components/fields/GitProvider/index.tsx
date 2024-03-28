import React from 'react';
import { GIT_PROVIDER_ICON_MAPPING } from '../../../../../../../configs/icon-mappings';
import { gitProviderOptions } from '../../../../../../../configs/select-options/gitProviders';
import { GIT_PROVIDERS } from '../../../../../../../constants/gitProviders';
import { Resources } from '../../../../../../../icons/sprites/Resources';
import { RESOURCE_ICON_NAMES } from '../../../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../../../icons/UseSpriteSymbol';
import { FormRadioGroup } from '../../../../../../../providers/Form/components/FormRadioGroup';
import { FieldEvent, FORM_MODES } from '../../../../../../../types/forms';
import { useGitServerFormsContext } from '../../../../../hooks/useGitServerFormsContext';
import { GIT_SERVER_FORM_NAMES } from '../../../../../names';

export const GitProvider = () => {
  const {
    forms: { gitServer: gitServerForm },
    sharedForm,
  } = useGitServerFormsContext();

  const handleFieldValueChange = React.useCallback(
    ({ target: { value } }: FieldEvent) => {
      sharedForm.setValue(GIT_SERVER_FORM_NAMES.gitProvider.name, value, { shouldDirty: false });

      if (gitServerForm.form.formState.dirtyFields?.gitUser) {
        return value;
      }

      switch (value) {
        case GIT_PROVIDERS.GERRIT:
          gitServerForm.form.setValue(GIT_SERVER_FORM_NAMES.gitUser.name, 'edp-ci');
          break;
        case GIT_PROVIDERS.GITHUB:
          gitServerForm.form.setValue(GIT_SERVER_FORM_NAMES.gitUser.name, 'git');
          break;
        case GIT_PROVIDERS.GITLAB:
          gitServerForm.form.setValue(GIT_SERVER_FORM_NAMES.gitUser.name, 'git');
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
                name={GIT_PROVIDER_ICON_MAPPING?.[value] || RESOURCE_ICON_NAMES.OTHER}
                width={20}
                height={20}
              />
            ),
            checkedIcon: (
              <UseSpriteSymbol
                name={GIT_PROVIDER_ICON_MAPPING?.[value] || RESOURCE_ICON_NAMES.OTHER}
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
