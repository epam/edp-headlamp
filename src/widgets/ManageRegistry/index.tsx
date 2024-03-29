import { Grid } from '@mui/material';
import React from 'react';
import { CONTAINER_REGISTRY_TYPE } from '../../k8s/ConfigMap/constants';
import { MultiFormContextProvider } from '../../providers/MultiForm';
import { FormItem } from '../../providers/MultiForm/types';
import { FORM_MODES } from '../../types/forms';
import { Actions } from './components/Actions';
import { ConfigMapForm } from './components/ConfigMap';
import { UseSameAccount } from './components/fields';
import { PullAccountForm } from './components/PullAccount';
import { PushAccountForm } from './components/PushAccount';
import { ServiceAccountForm } from './components/ServiceAccount';
import { useConfigMapEdit } from './hooks/useConfigMapEditForm';
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
}: ManageRegistryProps) => {
  const pushAccountFormMode = pushAccountSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const pullAccountFormMode = pullAccountSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const configMapFormMode = EDPConfigMap?.data.container_registry_type
    ? FORM_MODES.EDIT
    : FORM_MODES.CREATE;

  const { form: sharedForm } = useSharedForm({
    EDPConfigMap,
    pushAccountSecret,
    pullAccountSecret,
  });

  const registryTypeFieldValue = sharedForm.watch(SHARED_FORM_NAMES.registryType.name);

  const registryEndpointFieldValue = sharedForm.watch(SHARED_FORM_NAMES.registryEndpoint.name);

  const {
    form: pushAccountCreateForm,
    mutation: pushAccountCreateMutation,
    handleSubmit: handlePushAccountCreateSubmit,
  } = usePushAccountCreateForm({
    pushAccountSecret,
    registryEndpoint: registryEndpointFieldValue,
    registryType: registryTypeFieldValue,
  });

  const {
    form: pushAccountEditForm,
    mutation: pushAccountEditMutation,
    handleSubmit: handlePushAccountEditSubmit,
  } = usePushAccountEditForm({
    pushAccountSecret,
    registryEndpoint: registryEndpointFieldValue,
    registryType: registryTypeFieldValue,
  });

  const {
    form: pullAccountCreateForm,
    mutation: pullAccountCreateMutation,
    handleSubmit: handlePullAccountCreateSubmit,
  } = usePullAccountCreateForm({
    pullAccountSecret,
    registryEndpoint: registryEndpointFieldValue,
    registryType: registryTypeFieldValue,
  });

  const {
    form: pullAccountEditForm,
    mutation: pullAccountEditMutation,
    handleSubmit: handlePullAccountEditSubmit,
  } = usePullAccountEditForm({
    pullAccountSecret,
    registryEndpoint: registryEndpointFieldValue,
    registryType: registryTypeFieldValue,
  });

  const {
    form: configMapEditForm,
    mutation: configMapEditMutation,
    handleSubmit: handleConfigMapEditSubmit,
  } = useConfigMapEdit({
    EDPConfigMap,
  });

  const {
    form: serviceAccountEditForm,
    mutation: serviceAccountEditMutation,
    handleSubmit: handleServiceAccountEditSubmit,
  } = useServiceAccountEditForm({
    tektonServiceAccount,
  });

  const pushAccountForm: FormItem = React.useMemo(
    () =>
      pushAccountFormMode === FORM_MODES.CREATE
        ? {
            mode: pushAccountFormMode,
            form: pushAccountCreateForm,
            onSubmit: pushAccountCreateForm.handleSubmit(handlePushAccountCreateSubmit),
            isSubmitting: pushAccountCreateMutation.isLoading,
          }
        : {
            mode: pushAccountFormMode,
            form: pushAccountEditForm,
            onSubmit: pushAccountEditForm.handleSubmit(handlePushAccountEditSubmit),
            isSubmitting: pushAccountEditMutation.isLoading,
          },
    [
      handlePushAccountCreateSubmit,
      handlePushAccountEditSubmit,
      pushAccountCreateForm,
      pushAccountCreateMutation.isLoading,
      pushAccountEditForm,
      pushAccountEditMutation.isLoading,
      pushAccountFormMode,
    ]
  );

  const pullAccountForm: FormItem = React.useMemo(
    () =>
      pullAccountFormMode === FORM_MODES.CREATE
        ? {
            mode: pullAccountFormMode,
            form: pullAccountCreateForm,
            onSubmit: pullAccountCreateForm.handleSubmit(handlePullAccountCreateSubmit),
            isSubmitting: pullAccountCreateMutation.isLoading,
          }
        : {
            mode: pullAccountFormMode,
            form: pullAccountEditForm,
            onSubmit: pullAccountEditForm.handleSubmit(handlePullAccountEditSubmit),
            isSubmitting: pullAccountEditMutation.isLoading,
          },
    [
      handlePullAccountCreateSubmit,
      handlePullAccountEditSubmit,
      pullAccountCreateForm,
      pullAccountCreateMutation.isLoading,
      pullAccountEditForm,
      pullAccountEditMutation.isLoading,
      pullAccountFormMode,
    ]
  );

  const configMapForm: FormItem = React.useMemo(
    () => ({
      mode: configMapFormMode,
      form: configMapEditForm,
      onSubmit: configMapEditForm.handleSubmit(handleConfigMapEditSubmit),
      isSubmitting: configMapEditMutation.isLoading,
    }),
    [
      configMapEditForm,
      configMapEditMutation.isLoading,
      configMapFormMode,
      handleConfigMapEditSubmit,
    ]
  );

  const serviceAccountForm: FormItem = React.useMemo(
    () => ({
      mode: FORM_MODES.EDIT,
      form: serviceAccountEditForm,
      onSubmit: serviceAccountEditForm.handleSubmit(handleServiceAccountEditSubmit),
      isSubmitting: serviceAccountEditMutation.isLoading,
    }),
    [handleServiceAccountEditSubmit, serviceAccountEditForm, serviceAccountEditMutation.isLoading]
  );

  const renderServiceAccountForm = React.useCallback(() => {
    if (satisfiesType(registryTypeFieldValue, [CONTAINER_REGISTRY_TYPE.ECR])) {
      return (
        <Grid item xs={12}>
          <ServiceAccountForm />
        </Grid>
      );
    }
  }, [registryTypeFieldValue]);

  const renderPushAccountForm = React.useCallback(() => {
    if (
      satisfiesType(registryTypeFieldValue, [
        CONTAINER_REGISTRY_TYPE.HARBOR,
        CONTAINER_REGISTRY_TYPE.NEXUS,
        CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY,
        CONTAINER_REGISTRY_TYPE.DOCKER_HUB,
      ])
    ) {
      return (
        <>
          <Grid item xs={12}>
            <PushAccountForm />
          </Grid>
          <Grid item xs={12}>
            <UseSameAccount />
          </Grid>
        </>
      );
    }
  }, [registryTypeFieldValue]);

  const renderPullAccountForm = React.useCallback(() => {
    if (
      satisfiesType(registryTypeFieldValue, [
        CONTAINER_REGISTRY_TYPE.HARBOR,
        CONTAINER_REGISTRY_TYPE.NEXUS,
        CONTAINER_REGISTRY_TYPE.DOCKER_HUB,
      ])
    ) {
      return (
        <Grid item xs={12}>
          <PullAccountForm />
        </Grid>
      );
    }
  }, [registryTypeFieldValue]);

  return (
    <DataContextProvider
      EDPConfigMap={EDPConfigMap}
      pushAccountSecret={pushAccountSecret}
      pullAccountSecret={pullAccountSecret}
      tektonServiceAccount={tektonServiceAccount}
    >
      <MultiFormContextProvider<FormNames>
        forms={{
          pushAccount: pushAccountForm,
          pullAccount: pullAccountForm,
          configMap: configMapForm,
          serviceAccount: serviceAccountForm,
        }}
        sharedForm={sharedForm}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ConfigMapForm />
          </Grid>
          {renderServiceAccountForm()}
          {renderPushAccountForm()}
          {renderPullAccountForm()}
          <Grid item xs={12}>
            <Actions />
          </Grid>
        </Grid>
      </MultiFormContextProvider>
    </DataContextProvider>
  );
};
