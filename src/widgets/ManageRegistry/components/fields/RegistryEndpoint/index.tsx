import React from 'react';
import { useFormContext as useHookFormContext } from 'react-hook-form';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../k8s/ConfigMap/constants';
import { FormTextField } from '../../../../../providers/Form/components/FormTextField';
import { REGISTRY_NAMES } from '../../../names';

const TYPE_EMPTY_MESSAGE_MAP = {
  [CONTAINER_REGISTRY_TYPE.HARBOR]: 'Enter the Harbor registry endpoint URL.',
  [CONTAINER_REGISTRY_TYPE.ECR]: 'Enter the AWS ECR registry endpoint URL.',
  [CONTAINER_REGISTRY_TYPE.DOCKER_HUB]: 'Enter the DockerHub registry endpoint URL.',
  [CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY]: 'Enter the OpenShift registry endpoint URL.',
  [CONTAINER_REGISTRY_TYPE.NEXUS]: 'Enter the Nexus registry endpoint URL.',
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
};

export const RegistryEndpoint = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useHookFormContext();

  const registryTypeFieldValue = watch(REGISTRY_NAMES.REGISTRY_TYPE);

  return (
    <FormTextField
      {...register(REGISTRY_NAMES.REGISTRY_HOST, {
        required: TYPE_EMPTY_MESSAGE_MAP[registryTypeFieldValue] || 'Enter registry endpoint URL.',
      })}
      label={'Registry Endpoint'}
      placeholder={'Enter registry endpoint'}
      title={TYPE_TITLE_MAP[registryTypeFieldValue] || 'Enter registry endpoint URL.'}
      control={control}
      errors={errors}
      disabled={registryTypeFieldValue === CONTAINER_REGISTRY_TYPE.DOCKER_HUB}
    />
  );
};
