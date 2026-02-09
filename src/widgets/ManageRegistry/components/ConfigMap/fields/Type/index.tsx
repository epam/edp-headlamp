import React from 'react';
import { REGISTRY_TYPE_ICON_MAPPING } from '../../../../../../configs/icon-mappings';
import { Resources } from '../../../../../../icons/sprites/Resources';
import { RESOURCE_ICON_NAMES } from '../../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../../icons/UseSpriteSymbol';
import {
  CONTAINER_REGISTRY_PLATFORM,
  CONTAINER_REGISTRY_TYPE,
  CONTAINER_REGISTRY_TYPE_BY_PLATFORM,
  CONTAINER_REGISTRY_TYPE_LABEL_MAP,
} from '../../../../../../k8s/groups/default/ConfigMap/constants';
import { FormRadioGroup } from '../../../../../../providers/Form/components/FormRadioGroup';
import { FieldEvent, FORM_MODES } from '../../../../../../types/forms';
import { ValueOf } from '../../../../../../types/global';
import { DOCKER_HUB_REGISTRY_ENDPOINT, GHCR_ENDPOINT } from '../../../../constants';
import { useRegistryFormsContext } from '../../../../hooks/useRegistryFormsContext';
import {
  CONFIG_MAP_FORM_NAMES,
  PUSH_ACCOUNT_FORM_NAMES,
  SHARED_FORM_NAMES,
} from '../../../../names';
import { useDataContext } from '../../../../providers/Data/hooks';

const createRegistryTypeOptions = (platformName: ValueOf<typeof CONTAINER_REGISTRY_PLATFORM>) => {
  if (!platformName || !CONTAINER_REGISTRY_TYPE_BY_PLATFORM?.[platformName]) {
    return [];
  }

  return CONTAINER_REGISTRY_TYPE_BY_PLATFORM[platformName].map((value) => ({
    label: CONTAINER_REGISTRY_TYPE_LABEL_MAP[value],
    value: value,
  }));
};

export const Type = () => {
  const {
    forms: { configMap, pushAccount },
    sharedForm,
  } = useRegistryFormsContext();

  const { EDPConfigMap } = useDataContext();

  const platform = EDPConfigMap?.data.platform;

  const registryTypeOptions = React.useMemo(
    () => createRegistryTypeOptions(platform as ValueOf<typeof CONTAINER_REGISTRY_PLATFORM>),
    [platform]
  );

  return (
    <>
      <Resources />
      <FormRadioGroup
        {...configMap.form.register(CONFIG_MAP_FORM_NAMES.registryType.name, {
          required: 'Select a registry type you would like to create.',
          onChange: ({ target: { value } }: FieldEvent) => {
            sharedForm.setValue(SHARED_FORM_NAMES.registryType.name, value, {
              shouldDirty: false,
            });

            switch (value) {
              case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
                configMap.form.setValue(
                  CONFIG_MAP_FORM_NAMES.registryEndpoint.name,
                  DOCKER_HUB_REGISTRY_ENDPOINT,
                  {
                    shouldDirty: false,
                  }
                );
                sharedForm.setValue(
                  SHARED_FORM_NAMES.registryEndpoint.name,
                  DOCKER_HUB_REGISTRY_ENDPOINT,
                  {
                    shouldDirty: false,
                  }
                );
                break;
              case CONTAINER_REGISTRY_TYPE.GHCR:
                configMap.form.setValue(
                  CONFIG_MAP_FORM_NAMES.registryEndpoint.name,
                  GHCR_ENDPOINT,
                  {
                    shouldDirty: false,
                  }
                );
                sharedForm.setValue(SHARED_FORM_NAMES.registryEndpoint.name, GHCR_ENDPOINT, {
                  shouldDirty: false,
                });
                break;
              case CONTAINER_REGISTRY_TYPE.ECR:
                pushAccount.form.setValue(PUSH_ACCOUNT_FORM_NAMES.pushAccountPassword.name, '', {
                  shouldDirty: true,
                });
                break;
              default:
                configMap.form.resetField(CONFIG_MAP_FORM_NAMES.registryEndpoint.name, {
                  keepDirty: false,
                });
                sharedForm.resetField(SHARED_FORM_NAMES.registryEndpoint.name, {
                  keepDirty: false,
                });
            }
          },
        })}
        control={configMap.form.control}
        errors={configMap.form.formState.errors}
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
        disabled={configMap.mode === FORM_MODES.EDIT}
      />
    </>
  );
};
