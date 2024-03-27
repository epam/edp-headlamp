import React from 'react';
import { useFormContext } from 'react-hook-form';
import { GIT_PROVIDER_ICON_MAPPING } from '../../../../../../../configs/icon-mappings';
import { gitProviderOptions } from '../../../../../../../configs/select-options/gitProviders';
import { GIT_PROVIDERS } from '../../../../../../../constants/gitProviders';
import { Resources } from '../../../../../../../icons/sprites/Resources';
import { RESOURCE_ICON_NAMES } from '../../../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../../../icons/UseSpriteSymbol';
import { FormRadioGroup } from '../../../../../../../providers/Form/components/FormRadioGroup';
import { FieldEvent, FORM_MODES } from '../../../../../../../types/forms';
import { useDataContext } from '../../../../../providers/Data/hooks';
import { GIT_SERVER_FORM_NAMES } from '../../../names';
import { GitServerFormValues } from '../../../types';

export const GitProvider = () => {
  const {
    register,
    control,
    formState: { errors, dirtyFields },
    setValue,
  } = useFormContext<GitServerFormValues>();

  const { gitServerFormMode, setChosenGitProvider } = useDataContext();

  const handleFieldValueChange = React.useCallback(
    ({ target: { value } }: FieldEvent) => {
      setChosenGitProvider(value);

      if (dirtyFields?.gitUser) {
        return value;
      }

      switch (value) {
        case GIT_PROVIDERS.GERRIT:
          setValue(GIT_SERVER_FORM_NAMES.gitUser.name, 'edp-ci');
          break;
        case GIT_PROVIDERS.GITHUB:
          setValue(GIT_SERVER_FORM_NAMES.gitUser.name, 'git');
          break;
        case GIT_PROVIDERS.GITLAB:
          setValue(GIT_SERVER_FORM_NAMES.gitUser.name, 'git');
          break;
      }
    },
    [dirtyFields?.gitUser, setChosenGitProvider, setValue]
  );

  return (
    <>
      <Resources />
      <FormRadioGroup
        {...register(GIT_SERVER_FORM_NAMES.gitProvider.name, {
          required: 'Select your Git provider.',
          onChange: handleFieldValueChange,
        })}
        control={control}
        errors={errors}
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
        disabled={gitServerFormMode === FORM_MODES.EDIT}
      />
    </>
  );
};