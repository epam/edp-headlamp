import React from 'react';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../../k8s/groups/default/ConfigMap/constants';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { ValueOf } from '../../../../../../types/global';
import { useRegistryFormsContext } from '../../../../hooks/useRegistryFormsContext';
import { CONFIG_MAP_FORM_NAMES } from '../../../../names';

const TYPE_LABEL_MAP = {
  [CONTAINER_REGISTRY_TYPE.HARBOR]: 'Registry Space',
  [CONTAINER_REGISTRY_TYPE.ECR]: 'Registry Space',
  [CONTAINER_REGISTRY_TYPE.DOCKER_HUB]: 'Registry Space',
  [CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY]: 'Project',
  [CONTAINER_REGISTRY_TYPE.NEXUS]: 'Repository',
  [CONTAINER_REGISTRY_TYPE.GHCR]: 'Registry Space',
};

const TYPE_TITLE_MAP = {
  [CONTAINER_REGISTRY_TYPE.HARBOR]:
    'Specify the Kubernetes namespace that corresponds to the project name in Harbor.',
  [CONTAINER_REGISTRY_TYPE.ECR]: 'Specify the Kubernetes namespace name to associate with AWS ECR.',
  [CONTAINER_REGISTRY_TYPE.DOCKER_HUB]:
    'Specify the name of the DockerHub account or organization.',
  [CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY]: 'Specify the OpenShift registry space.',
  [CONTAINER_REGISTRY_TYPE.NEXUS]: 'Specify the Nexus repository that corresponds to your project.',
  [CONTAINER_REGISTRY_TYPE.GHCR]: 'Specify the name of the Github account or organization.',
};

const TYPE_EMPTY_MESSAGE_MAP = {
  [CONTAINER_REGISTRY_TYPE.HARBOR]: 'Enter the username for Harbor registry authentication.',
  [CONTAINER_REGISTRY_TYPE.ECR]: 'Enter the Kubernetes namespace name for AWS ECR.',
  [CONTAINER_REGISTRY_TYPE.DOCKER_HUB]: 'Enter the DockerHub account or organization name.',
  [CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY]: 'Enter the OpenShift registry space.',
  [CONTAINER_REGISTRY_TYPE.NEXUS]: 'Enter the Nexus repository name.',
  [CONTAINER_REGISTRY_TYPE.GHCR]: 'Enter the Github account or organization name.',
};

export const RegistrySpace = () => {
  const {
    forms: { configMap },
  } = useRegistryFormsContext();

  const registryTypeFieldValue = configMap.form.watch(CONFIG_MAP_FORM_NAMES.registryType.name);

  return (
    <FormTextField
      {...configMap.form.register(CONFIG_MAP_FORM_NAMES.registrySpace.name, {
        required:
          TYPE_EMPTY_MESSAGE_MAP[
            registryTypeFieldValue as ValueOf<typeof CONTAINER_REGISTRY_TYPE>
          ] || 'Enter registry space.',
        pattern: {
          value: /^[a-z0-9_-]+$/,
          message: 'Only alphanumeric characters, underscores, and hyphens are allowed.',
        },
      })}
      label={
        TYPE_LABEL_MAP[registryTypeFieldValue as ValueOf<typeof CONTAINER_REGISTRY_TYPE>] ||
        'Registry Space'
      }
      title={
        TYPE_TITLE_MAP[registryTypeFieldValue as ValueOf<typeof CONTAINER_REGISTRY_TYPE>] ||
        'Specify registry space.'
      }
      placeholder={'Enter registry space'}
      control={configMap.form.control}
      errors={configMap.form.formState.errors}
    />
  );
};
