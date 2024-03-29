import React from 'react';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../../k8s/ConfigMap/constants';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useRegistryFormsContext } from '../../../../hooks/useRegistryFormsContext';
import { CONFIG_MAP_FORM_NAMES } from '../../../../names';

const TYPE_LABEL_MAP = {
  [CONTAINER_REGISTRY_TYPE.HARBOR]: 'Registry Space',
  [CONTAINER_REGISTRY_TYPE.ECR]: 'Registry Space',
  [CONTAINER_REGISTRY_TYPE.DOCKER_HUB]: 'Registry Space',
  [CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY]: 'Project',
  [CONTAINER_REGISTRY_TYPE.NEXUS]: 'Repository',
};

const TYPE_TITLE_MAP = {
  [CONTAINER_REGISTRY_TYPE.HARBOR]:
    'Specify the Kubernetes namespace that corresponds to the project name in Harbor.',
  [CONTAINER_REGISTRY_TYPE.ECR]: 'Specify the Kubernetes namespace name to associate with AWS ECR.',
  [CONTAINER_REGISTRY_TYPE.DOCKER_HUB]:
    'Specify the name of the DockerHub account or organization.',
  [CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY]: 'Specify the OpenShift registry space.',
  [CONTAINER_REGISTRY_TYPE.NEXUS]: 'Specify the Nexus repository that corresponds to your project.',
};

const TYPE_EMPTY_MESSAGE_MAP = {
  [CONTAINER_REGISTRY_TYPE.HARBOR]: 'Enter the username for Harbor registry authentication.',
  [CONTAINER_REGISTRY_TYPE.ECR]: 'Enter the Kubernetes namespace name for AWS ECR.',
  [CONTAINER_REGISTRY_TYPE.DOCKER_HUB]: 'Enter the DockerHub account or organization name.',
  [CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY]: 'Enter the OpenShift registry space.',
  [CONTAINER_REGISTRY_TYPE.NEXUS]: 'Enter the Nexus repository name.',
};

export const RegistrySpace = () => {
  const {
    forms: { configMap },
  } = useRegistryFormsContext();

  const registryTypeFieldValue = configMap.form.watch(CONFIG_MAP_FORM_NAMES.registryType.name);

  return (
    <FormTextField
      {...configMap.form.register(CONFIG_MAP_FORM_NAMES.registrySpace.name, {
        required: TYPE_EMPTY_MESSAGE_MAP[registryTypeFieldValue] || 'Enter registry space.',
      })}
      label={TYPE_LABEL_MAP[registryTypeFieldValue] || 'Registry Space'}
      title={TYPE_TITLE_MAP[registryTypeFieldValue] || 'Specify registry space.'}
      placeholder={'Enter registry space'}
      control={configMap.form.control}
      errors={configMap.form.formState.errors}
    />
  );
};
