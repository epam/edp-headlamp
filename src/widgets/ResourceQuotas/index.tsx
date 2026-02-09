import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { Box, IconButton, Popover, Stack, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { BorderedSection } from '../../components/BorderedSection';
import { EmptyList } from '../../components/EmptyList';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { DEFAULT_CLUSTER } from '../../constants/clusters';
import { TenantKubeObject } from '../../k8s/groups/Capsule/Tenant';
import { ResourceQuotaKubeObject } from '../../k8s/groups/default/ResourceQuota';
import { RESOURCE_QUOTA_LABEL_TENANT } from '../../k8s/groups/default/ResourceQuota/labels';
import { ResourceQuotaKubeObjectInterface } from '../../k8s/groups/default/ResourceQuota/types';
import { StageKubeObject } from '../../k8s/groups/EDP/Stage';
import { StageKubeObjectInterface } from '../../k8s/groups/EDP/Stage/types';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { CircleProgress } from './components/CircleProgress';
import { RQItem } from './components/RQItem';
import { ParsedQuotas, QuotaDetails } from './types';
import { getColorByLoadPercentage, parseResourceQuota } from './utils';

export const ResourceQuotas = () => {
  const defaultNamespace = getDefaultNamespace();

  const [globalRQs, setGlobalRQs] = React.useState<{
    quotas: ParsedQuotas;
    highestUsedQuota: QuotaDetails | null;
  } | null>(null);
  const [globalRQsError, setGlobalRQsError] = React.useState<Error | ApiError | null>(null);

  const handleSetGlobalRQs = React.useCallback((items: ResourceQuotaKubeObjectInterface[]) => {
    if (items?.length === 0) {
      setGlobalRQs({
        quotas: {},
        highestUsedQuota: null,
      });
      return;
    }

    const useAnnotations = Object.keys(items[0]?.metadata?.annotations || {}).some((key) =>
      key.includes('quota.capsule.clastix.io')
    );

    setGlobalRQs(parseResourceQuota(items, useAnnotations));
  }, []);

  ResourceQuotaKubeObject.useApiList(handleSetGlobalRQs, setGlobalRQsError, {
    namespace: defaultNamespace,
    labelSelector: `${RESOURCE_QUOTA_LABEL_TENANT}=${defaultNamespace}`,
  });

  const [firstInClusterStage, setFirstInClusterStage] =
    React.useState<StageKubeObjectInterface | null>(null);
  const [stagesError, setStagesError] = React.useState<Error | ApiError | null>(null);

  const stageIsLoading = firstInClusterStage === null && !stagesError;

  const handleGetFirstInClusterStage = React.useCallback((stages: StageKubeObjectInterface[]) => {
    const firstFind = stages.find((stage) => stage.spec.clusterName === DEFAULT_CLUSTER);
    if (!firstFind) {
      return;
    }

    setFirstInClusterStage(firstFind);
  }, []);

  StageKubeObject.useApiList(handleGetFirstInClusterStage, setStagesError, {
    namespace: defaultNamespace,
  });

  const [stageRQs, setStageRQs] = React.useState<{
    quotas: ParsedQuotas;
    highestUsedQuota: QuotaDetails | null;
  } | null>(null);

  const [stageRQsError, setStageRQsError] = React.useState<Error | ApiError | null>(null);

  const handleSetStageRQs = React.useCallback((items: ResourceQuotaKubeObjectInterface[]) => {
    if (items?.length === 0) {
      setStageRQs({
        quotas: {},
        highestUsedQuota: null,
      });
      return;
    }

    const useAnnotations = Object.keys(items[0]?.metadata?.annotations || {}).some((key) =>
      key.includes('quota.capsule.clastix.io')
    );

    setStageRQs(parseResourceQuota(items, useAnnotations));
  }, []);

  const [namespacesQuota, setNamespacesQuota] = React.useState<{
    quotas: ParsedQuotas;
    highestUsedQuota: QuotaDetails | null;
  } | null>(null);

  TenantKubeObject.useApiGet((data) => {
    const namespacesHard = data?.spec?.namespaceOptions?.quota;

    if (!namespacesHard) {
      setNamespacesQuota({
        quotas: {},
        highestUsedQuota: null,
      });
      return;
    }

    const namespacesUsed = data.status.size;

    const usedPercentage = (namespacesUsed / namespacesHard) * 100;

    setNamespacesQuota({
      quotas: {
        namespaces: {
          hard: namespacesHard,
          hard_initial: namespacesHard,
          used: namespacesUsed,
          used_initial: namespacesUsed,
          usedPercentage: usedPercentage,
        },
      },
      highestUsedQuota: {
        usedPercentage: usedPercentage,
      },
    });
  }, `edp-workload-${defaultNamespace}`);

  React.useEffect(() => {
    if (stageIsLoading || !firstInClusterStage) {
      return;
    }

    const cancelStream = ResourceQuotaKubeObject.streamList({
      namespace: firstInClusterStage?.spec.namespace!,
      tenantNamespace: defaultNamespace,
      dataHandler: handleSetStageRQs,
      errorHandler: setStageRQsError,
    });

    return () => cancelStream();
  }, [
    defaultNamespace,
    firstInClusterStage,
    firstInClusterStage?.spec.namespace,
    handleSetStageRQs,
    stageIsLoading,
  ]);

  const highestUsedQuota = React.useMemo(() => {
    if (globalRQs === null || stageRQs === null || namespacesQuota === null) {
      return null;
    }

    const quotas = [
      globalRQs.highestUsedQuota,
      stageRQs.highestUsedQuota,
      namespacesQuota.highestUsedQuota,
    ].filter(Boolean);

    if (quotas.length === 0) {
      return null;
    }

    return quotas.reduce(
      (max, quota) => {
        return (quota?.usedPercentage ?? 0) > (max?.usedPercentage ?? 0) ? quota : max;
      },
      { usedPercentage: 0 }
    );
  }, [globalRQs, stageRQs, namespacesQuota]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const globalRQsDataIsLoading = globalRQs === null && !globalRQsError;
  const stageRQsDataIsLoading = stageRQs === null && !stageRQsError;

  if (globalRQsDataIsLoading || stageRQsDataIsLoading) {
    return null;
  }

  const highestUsedQuotaColor = getColorByLoadPercentage(
    theme,
    highestUsedQuota?.usedPercentage || 0
  );

  if (
    !globalRQs?.highestUsedQuota &&
    !stageRQs?.highestUsedQuota &&
    !namespacesQuota?.highestUsedQuota
  ) {
    return null;
  }

  return (
    <>
      <Tooltip title="Platform Resource Usage">
        <IconButton onClick={handleClick} size="large">
          <CircleProgress
            loadPercentage={highestUsedQuota?.usedPercentage || 0}
            color={highestUsedQuotaColor}
          />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        keepMounted
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ py: theme.typography.pxToRem(40), px: theme.typography.pxToRem(40) }}>
          <Stack spacing={5}>
            <LoadingWrapper isLoading={globalRQsDataIsLoading}>
              <BorderedSection title="Platform Resource Usage">
                <Stack direction="row" spacing={5}>
                  {Object.keys(globalRQs!.quotas).length === 0 ? (
                    <EmptyList
                      customText="Failed to retrieve resource information from the platform. Check your platform configuration."
                      iconSize={64}
                    />
                  ) : (
                    Object.entries(globalRQs!.quotas).map(([entity, details]) => (
                      <RQItem key={`global-${entity}`} entity={entity} details={details} />
                    ))
                  )}
                </Stack>
              </BorderedSection>
            </LoadingWrapper>
            <LoadingWrapper isLoading={stageRQsDataIsLoading}>
              <BorderedSection title="Deployment Flows Resource Usage">
                {Object.keys(stageRQs!.quotas).length === 0 ? (
                  <EmptyList
                    customText="Resource information is not available yet. It may take some time for the data to be generated."
                    iconSize={64}
                  />
                ) : (
                  <Stack direction="row" spacing={5}>
                    {Object.entries(stageRQs!.quotas).map(([entity, details]) => (
                      <RQItem key={`stage-${entity}`} entity={entity} details={details} />
                    ))}
                    {Object.entries(namespacesQuota!.quotas).map(([entity, details]) => (
                      <RQItem key={`stage-${entity}`} entity={entity} details={details} />
                    ))}
                  </Stack>
                )}
              </BorderedSection>
            </LoadingWrapper>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};
