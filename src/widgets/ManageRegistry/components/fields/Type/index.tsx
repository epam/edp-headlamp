import React from 'react';
import { useFormContext as useReactHookFormDataContext } from 'react-hook-form';
import { REGISTRY_TYPE_ICON_MAPPING } from '../../../../../configs/icon-mappings';
import { Resources } from '../../../../../icons/sprites/Resources';
import { RESOURCE_ICON_NAMES } from '../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../icons/UseSpriteSymbol';
import {
  CONTAINER_REGISTRY_PLATFORM,
  CONTAINER_REGISTRY_TYPE,
  CONTAINER_REGISTRY_TYPE_BY_PLATFORM,
  CONTAINER_REGISTRY_TYPE_LABEL_MAP,
} from '../../../../../k8s/ConfigMap/constants';
import { FormRadioGroup } from '../../../../../providers/Form/components/FormRadioGroup';
import { useFormContext } from '../../../../../providers/Form/hooks';
import { FieldEvent, FORM_MODES } from '../../../../../types/forms';
import { ValueOf } from '../../../../../types/global';
import { REGISTRY_NAMES } from '../../../names';
import { ManageRegistryDataContext } from '../../../types';

const createRegistryTypeOptions = (platformName: ValueOf<typeof CONTAINER_REGISTRY_PLATFORM>) => {
  if (!platformName || !CONTAINER_REGISTRY_TYPE_BY_PLATFORM?.[platformName]) {
    return [];
  }

  return CONTAINER_REGISTRY_TYPE_BY_PLATFORM[platformName].map(value => ({
    label: CONTAINER_REGISTRY_TYPE_LABEL_MAP[value],
    value: value,
  }));
};

export const Type = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    resetField,
  } = useReactHookFormDataContext();

  const {
    formData: { EDPConfigMap },
  } = useFormContext<ManageRegistryDataContext>();

  const platform = EDPConfigMap?.data.platform;
  const registryType = EDPConfigMap?.data.container_registry_type;
  const mode = !!registryType ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const registryTypeOptions = React.useMemo(
    () => createRegistryTypeOptions(platform as ValueOf<typeof CONTAINER_REGISTRY_PLATFORM>),
    [platform]
  );

  return (
    <>
      <Resources />
      <FormRadioGroup
        {...register(REGISTRY_NAMES.REGISTRY_TYPE, {
          required: 'Select a registry type you would like to create.',
          onChange: ({ target: { value } }: FieldEvent) => {
            if (value === CONTAINER_REGISTRY_TYPE.DOCKER_HUB) {
              setValue(REGISTRY_NAMES.REGISTRY_HOST, 'docker.io');
            } else {
              resetField(REGISTRY_NAMES.REGISTRY_HOST);
            }
          },
        })}
        control={control}
        errors={errors}
        label={'Registry Provider'}
        title={'Select a registry type you would like to create'}
        options={registryTypeOptions.map(({ label, value }) => {
          return {
            value,
            label,
            icon: (
              <UseSpriteSymbol
                name={REGISTRY_TYPE_ICON_MAPPING?.[value] || RESOURCE_ICON_NAMES.OTHER}
                width={20}
                height={20}
              />
            ),
            checkedIcon: (
              <UseSpriteSymbol
                name={REGISTRY_TYPE_ICON_MAPPING?.[value] || RESOURCE_ICON_NAMES.OTHER}
                width={20}
                height={20}
              />
            ),
          };
        })}
        disabled={mode === FORM_MODES.EDIT}
      />
    </>
  );
};
