import { Grid } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormDataContext } from 'react-hook-form';
import { CONTAINER_REGISTRY_TYPE } from '../../../../../../k8s/ConfigMap/constants';
import { REGISTRY_NAMES } from '../../../../names';
import { RegistryEndpoint, RegistrySpace, Type } from '../../../fields';
import { DockerHubOrHarborFormPart } from './components/DockerHubOrHarborFormPart';
import { ECRFormPart } from './components/ECRFormPart';
import { OpenshiftFormPart } from './components/OpenshiftFormPart';

export const Form = () => {
  const { watch } = useReactHookFormDataContext();

  const registryTypeFieldValue = watch(REGISTRY_NAMES.REGISTRY_TYPE);

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Type />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <RegistryEndpoint />
          </Grid>
          <Grid item xs={6}>
            <RegistrySpace />
          </Grid>
        </Grid>
      </Grid>
      {registryTypeFieldValue === CONTAINER_REGISTRY_TYPE.ECR && <ECRFormPart />}
      {(registryTypeFieldValue === CONTAINER_REGISTRY_TYPE.DOCKER_HUB ||
        registryTypeFieldValue === CONTAINER_REGISTRY_TYPE.HARBOR) && <DockerHubOrHarborFormPart />}
      {registryTypeFieldValue === CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY && (
        <OpenshiftFormPart />
      )}
    </Grid>
  );
};
