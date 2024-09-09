import { Grid } from '@mui/material';
import React from 'react';
import { CONTAINER_REGISTRY_TYPE } from '../../k8s/groups/default/ConfigMap/constants';
import { MultiFormContextProvider } from '../../providers/MultiForm/provider';
import { FormItem } from '../../providers/MultiForm/types';
import { FORM_MODES } from '../../types/forms';
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
  handleCloseCreateDialog,
}: ManageRegistryProps) => {
  const pushAccountFormMode = pushAccountSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const pullAccountFormMode = pullAccountSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const configMapFormMode = EDPConfigMap?.data.container_registry_type
    ? FORM_MODES.EDIT
    : FORM_MODES.CREATE;

  const sharedForm = useSharedForm({
    EDPConfigMap,
    pushAccountSecret,
    pullAccountSecret,
  });

  const registryTypeFieldValue = sharedForm.form.watch(SHARED_FORM_NAMES.registryType.name);

  const pushAccountCreateForm = usePushAccountCreateForm({
    pushAccountSecret,
    sharedForm: sharedForm.form,
  });

  const pushAccountEditForm = usePushAccountEditForm({
    pushAccountSecret,
    sharedForm: sharedForm.form,
  });

  const pullAccountCreateForm = usePullAccountCreateForm({
    pullAccountSecret,
    sharedForm: sharedForm.form,
  });

  const pullAccountEditForm = usePullAccountEditForm({
    pullAccountSecret,
    sharedForm: sharedForm.form,
  });

  const configMapEditForm = useConfigMapEditForm({
    EDPConfigMap,
  });

  const serviceAccountEditForm = useServiceAccountEditForm({
    tektonServiceAccount,
  });

  const pushAccountFormData: FormItem = React.useMemo(
    () =>
      pushAccountFormMode === FORM_MODES.CREATE
        ? {
            mode: pushAccountFormMode,
            form: pushAccountCreateForm.form,
            onSubmit: pushAccountCreateForm.form.handleSubmit(pushAccountCreateForm.handleSubmit),
            isSubmitting: pushAccountCreateForm.mutation.isLoading,
          }
        : {
            mode: pushAccountFormMode,
            form: pushAccountEditForm.form,
            onSubmit: pushAccountEditForm.form.handleSubmit(pushAccountEditForm.handleSubmit),
            isSubmitting: pushAccountEditForm.mutation.isLoading,
          },
    [pushAccountCreateForm, pushAccountEditForm, pushAccountFormMode]
  );

  const pullAccountFormData: FormItem = React.useMemo(
    () =>
      pullAccountFormMode === FORM_MODES.CREATE
        ? {
            mode: pullAccountFormMode,
            form: pullAccountCreateForm.form,
            onSubmit: pullAccountCreateForm.form.handleSubmit(pullAccountCreateForm.handleSubmit),
            isSubmitting: pullAccountCreateForm.mutation.isLoading,
          }
        : {
            mode: pullAccountFormMode,
            form: pullAccountEditForm.form,
            onSubmit: pullAccountEditForm.form.handleSubmit(pullAccountEditForm.handleSubmit),
            isSubmitting: pullAccountEditForm.mutation.isLoading,
          },
    [pullAccountCreateForm, pullAccountEditForm, pullAccountFormMode]
  );

  const configMapFormData: FormItem = React.useMemo(
    () => ({
      mode: configMapFormMode,
      form: configMapEditForm.form,
      onSubmit: configMapEditForm.form.handleSubmit(configMapEditForm.handleSubmit),
      isSubmitting: configMapEditForm.mutation.isLoading,
    }),
    [configMapEditForm, configMapFormMode]
  );

  const serviceAccountFormData: FormItem = React.useMemo(
    () => ({
      mode: FORM_MODES.EDIT,
      form: serviceAccountEditForm.form,
      onSubmit: serviceAccountEditForm.form.handleSubmit(serviceAccountEditForm.handleSubmit),
      isSubmitting: serviceAccountEditForm.mutation.isLoading,
    }),
    [serviceAccountEditForm]
  );

  return (
    <div data-testid="form">
      <DataContextProvider
        EDPConfigMap={EDPConfigMap}
        pushAccountSecret={pushAccountSecret}
        pullAccountSecret={pullAccountSecret}
        tektonServiceAccount={tektonServiceAccount}
      >
        <MultiFormContextProvider<FormNames>
          forms={{
            pushAccount: pushAccountFormData,
            pullAccount: pullAccountFormData,
            configMap: configMapFormData,
            serviceAccount: serviceAccountFormData,
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
