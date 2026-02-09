import { Grid } from '@mui/material';
import React from 'react';
import { CONTAINER_REGISTRY_TYPE } from '../../k8s/groups/default/ConfigMap/constants';
import { MultiFormContextProvider } from '../../providers/MultiForm/provider';
import { Actions } from './components/Actions';
import { ConfigMapForm } from './components/ConfigMap';
import { UseSameAccount } from './components/fields';
import { PullAccountForm } from './components/PullAccount';
import { PushAccountForm } from './components/PushAccount';
import { ServiceAccountForm } from './components/ServiceAccount';
import { useConfigMapEditForm } from './hooks/useConfigMapEditForm';
import { usePullAccountCreateForm } from './hooks/usePullAccountCreateForm';
import { usePullAccountEditForm } from './hooks/usePullAccountEditForm';
import { usePushAccountCreateForm } from './hooks/usePushAccountCreateForm';
import { usePushAccountEditForm } from './hooks/usePushAccountEditForm';
import { useServiceAccountEditForm } from './hooks/useServiceAccountEditForm';
import { useSharedForm } from './hooks/useSharedForm';
import { SHARED_FORM_NAMES } from './names';
import { DataContextProvider } from './providers/Data';
import { FormNames, ManageRegistryProps } from './types';

const satisfiesType = (registryType: string, allowedTypes: string[]) => {
  return registryType && allowedTypes.includes(registryType);
};

export const ManageRegistry = ({
  EDPConfigMap,
  pushAccountSecret,
  pullAccountSecret,
  tektonServiceAccount,
  permissions,
  handleCloseCreateDialog,
}: ManageRegistryProps) => {
  const sharedForm = useSharedForm({
    EDPConfigMap,
    pushAccountSecret,
    pullAccountSecret,
  });

  const registryTypeFieldValue = sharedForm.form.watch(SHARED_FORM_NAMES.registryType.name);

  const pushAccountCreateForm = usePushAccountCreateForm({
    pushAccountSecret,
    sharedForm: sharedForm.form,
    permissions,
  });

  const pushAccountEditForm = usePushAccountEditForm({
    pushAccountSecret,
    sharedForm: sharedForm.form,
    permissions,
  });

  const pullAccountCreateForm = usePullAccountCreateForm({
    pullAccountSecret,
    sharedForm: sharedForm.form,
    permissions,
  });

  const pullAccountEditForm = usePullAccountEditForm({
    pullAccountSecret,
    sharedForm: sharedForm.form,
    permissions,
  });

  const configMapEditForm = useConfigMapEditForm({
    EDPConfigMap,
    permissions,
  });

  const serviceAccountEditForm = useServiceAccountEditForm({
    tektonServiceAccount,
    permissions,
  });

  const pushAccountForm = pushAccountSecret ? pushAccountEditForm : pushAccountCreateForm;
  const pullAccountForm = pullAccountSecret ? pullAccountEditForm : pullAccountCreateForm;

  return (
    <div data-testid="form">
      <DataContextProvider
        EDPConfigMap={EDPConfigMap}
        pushAccountSecret={pushAccountSecret}
        pullAccountSecret={pullAccountSecret}
        tektonServiceAccount={tektonServiceAccount}
        permissions={permissions}
      >
        <MultiFormContextProvider<FormNames>
          forms={{
            pushAccount: pushAccountForm,
            pullAccount: pullAccountForm,
            configMap: configMapEditForm,
            serviceAccount: serviceAccountEditForm,
          }}
          sharedForm={sharedForm.form}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ConfigMapForm />
            </Grid>
            {satisfiesType(registryTypeFieldValue, [CONTAINER_REGISTRY_TYPE.ECR]) && (
              <Grid item xs={12}>
                <ServiceAccountForm />
              </Grid>
            )}
            {satisfiesType(registryTypeFieldValue, [
              CONTAINER_REGISTRY_TYPE.HARBOR,
              CONTAINER_REGISTRY_TYPE.NEXUS,
              CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY,
              CONTAINER_REGISTRY_TYPE.DOCKER_HUB,
              CONTAINER_REGISTRY_TYPE.GHCR,
            ]) && (
              <Grid item xs={12}>
                <PushAccountForm />
              </Grid>
            )}
            {satisfiesType(registryTypeFieldValue, [
              CONTAINER_REGISTRY_TYPE.HARBOR,
              CONTAINER_REGISTRY_TYPE.NEXUS,
              CONTAINER_REGISTRY_TYPE.DOCKER_HUB,
              CONTAINER_REGISTRY_TYPE.GHCR,
            ]) && (
              <Grid item xs={12}>
                <UseSameAccount />
              </Grid>
            )}
            {satisfiesType(registryTypeFieldValue, [
              CONTAINER_REGISTRY_TYPE.HARBOR,
              CONTAINER_REGISTRY_TYPE.NEXUS,
              CONTAINER_REGISTRY_TYPE.DOCKER_HUB,
              CONTAINER_REGISTRY_TYPE.GHCR,
            ]) && (
              <Grid item xs={12}>
                <PullAccountForm />
              </Grid>
            )}
            <Grid item xs={12}>
              <Actions handleCloseCreateDialog={handleCloseCreateDialog} />
            </Grid>
          </Grid>
        </MultiFormContextProvider>
      </DataContextProvider>
    </div>
  );
};
