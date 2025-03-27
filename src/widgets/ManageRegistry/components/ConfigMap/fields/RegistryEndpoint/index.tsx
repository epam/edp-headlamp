import React from 'react';
import { VALIDATED_PROTOCOL } from '../../../../../../constants/validatedProtocols';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../../k8s/groups/default/ConfigMap/constants';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../../types/forms';
import { ValueOf } from '../../../../../../types/global';
import { getValidURLPattern } from '../../../../../../utils/checks/getValidURLPattern';
import { useRegistryFormsContext } from '../../../../hooks/useRegistryFormsContext';
import { CONFIG_MAP_FORM_NAMES, SHARED_FORM_NAMES } from '../../../../names';

const TYPE_EMPTY_MESSAGE_MAP = {
  [CONTAINER_REGISTRY_TYPE.HARBOR]: 'Enter the Harbor registry endpoint URL.',
  [CONTAINER_REGISTRY_TYPE.ECR]: 'Enter the AWS ECR registry endpoint URL.',
  [CONTAINER_REGISTRY_TYPE.DOCKER_HUB]: 'Enter the DockerHub registry endpoint URL.',
  [CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY]: 'Enter the OpenShift registry endpoint URL.',
  [CONTAINER_REGISTRY_TYPE.NEXUS]: 'Enter the Nexus registry endpoint URL.',
  [CONTAINER_REGISTRY_TYPE.GHCR]: 'Enter the Github Container registry endpoint URL.',
};

const TYPE_TITLE_MAP = {
  [CONTAINER_REGISTRY_TYPE.HARBOR]:
    'Input the Harbor registry endpoint URL (e.g., registry.example.com).',
  [CONTAINER_REGISTRY_TYPE.ECR]:
    'Enter the AWS ECR registry endpoint URL. (E.g., 122333444455.dkr.ecr.us-east-1.amazonaws.com).',
  [CONTAINER_REGISTRY_TYPE.DOCKER_HUB]:
    'Enter the DockerHub registry endpoint URL (e.g., docker.io).',
  [CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY]:
    'Enter the OpenShift registry endpoint URL (e.g., image-registry.openshift-image-registry.svc:5000).',
  [CONTAINER_REGISTRY_TYPE.NEXUS]:
    'Enter the Nexus registry endpoint URL (e.g., nexus.example.com).',
  [CONTAINER_REGISTRY_TYPE.GHCR]:
    'Enter the Github Container registry endpoint URL (e.g., ghcr.io).',
};

export const RegistryEndpoint = () => {
  const {
    forms: { configMap, pushAccount, pullAccount },
    sharedForm,
  } = useRegistryFormsContext();

  const registryTypeFieldValue = configMap.form.watch(CONFIG_MAP_FORM_NAMES.registryType.name);

  return (
    <FormTextField
      {...configMap.form.register(CONFIG_MAP_FORM_NAMES.registryEndpoint.name, {
        onChange: ({ target: { value } }: FieldEvent) => {
          sharedForm.setValue(SHARED_FORM_NAMES.registryEndpoint.name, value);

          switch (registryTypeFieldValue) {
            case CONTAINER_REGISTRY_TYPE.HARBOR:
            case CONTAINER_REGISTRY_TYPE.GHCR:
            case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
            case CONTAINER_REGISTRY_TYPE.NEXUS:
            case CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY:
              pushAccount.form.setValue(SHARED_FORM_NAMES.registryEndpoint.name, value, {
                shouldDirty: true,
              });
              pullAccount.form.setValue(SHARED_FORM_NAMES.registryEndpoint.name, value, {
                shouldDirty: true,
              });
            default:
              break;
          }
        },
        required:
          TYPE_EMPTY_MESSAGE_MAP[
            registryTypeFieldValue as ValueOf<typeof CONTAINER_REGISTRY_TYPE>
          ] || 'Enter registry endpoint URL.',
        pattern: {
          value: getValidURLPattern(VALIDATED_PROTOCOL.NO_PROTOCOL),
          message: 'Enter a valid URL without protocol.',
        },
      })}
      label={'Registry Endpoint'}
      placeholder={'Enter registry endpoint'}
      title={
        TYPE_TITLE_MAP[registryTypeFieldValue as ValueOf<typeof CONTAINER_REGISTRY_TYPE>] ||
        'Enter registry endpoint URL.'
      }
      control={configMap.form.control}
      errors={configMap.form.formState.errors}
      disabled={
        registryTypeFieldValue === CONTAINER_REGISTRY_TYPE.DOCKER_HUB ||
        registryTypeFieldValue === CONTAINER_REGISTRY_TYPE.GHCR
      }
    />
  );
};
