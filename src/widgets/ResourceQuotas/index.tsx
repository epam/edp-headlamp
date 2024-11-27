import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { Box, IconButton, Popover, Stack, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { BorderedSection } from '../../components/BorderedSection';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { DEFAULT_CLUSTER } from '../../constants/clusters';
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
  }>(null);
  const [globalRQsError, setGlobalRQsError] = React.useState<Error | ApiError>(null);

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
    React.useState<StageKubeObjectInterface>(null);
  const [stagesError, setStagesError] = React.useState<Error | ApiError>(null);

  const stageIsLoading = firstInClusterStage === null && !stagesError;

  const handleGetFirstInClusterStage = React.useCallback((stages: StageKubeObjectInterface[]) => {
    const firstFind = stages.find((stage) => stage.spec.clusterName === DEFAULT_CLUSTER);
    setFirstInClusterStage(firstFind);
  }, []);

  StageKubeObject.useApiList(handleGetFirstInClusterStage, setStagesError, {
    namespace: defaultNamespace,
  });

  const [stageRQs, setStageRQs] = React.useState<{
    quotas: ParsedQuotas;
    highestUsedQuota: QuotaDetails | null;
  }>(null);
  const [stageRQsError, setStageRQsError] = React.useState<Error | ApiError>(null);

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

  React.useEffect(() => {
    if (stageIsLoading) {
      return;
    }

    const cancelStream = ResourceQuotaKubeObject.streamList({
      namespace: firstInClusterStage?.spec.namespace,
      tenantNamespace: defaultNamespace,
      dataHandler: handleSetStageRQs,
      errorHandler: setStageRQsError,
    });

    return () => cancelStream();
  }, [defaultNamespace, firstInClusterStage?.spec.namespace, handleSetStageRQs, stageIsLoading]);

  const highestUsedQuota = React.useMemo(() => {
    if (globalRQs === null || stageRQs === null) {
      return null;
    }

    if (globalRQs.highestUsedQuota === null && stageRQs.highestUsedQuota === null) {
      return null;
    }

    if (globalRQs.highestUsedQuota === null) {
      return stageRQs.highestUsedQuota;
    }

    if (stageRQs.highestUsedQuota === null) {
      return globalRQs.highestUsedQuota;
    }

    return globalRQs.highestUsedQuota.usedPercentage > stageRQs.highestUsedQuota.usedPercentage
      ? globalRQs.highestUsedQuota
      : stageRQs.highestUsedQuota;
  }, [globalRQs, stageRQs]);

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

  const highestUsedQuotaColor = getColorByLoadPercentage(theme, highestUsedQuota.usedPercentage);

  return (
    <>
      <Tooltip title="Resource Quotas">
        <IconButton onClick={handleClick} size="large">
          <CircleProgress
            loadPercentage={highestUsedQuota.usedPercentage}
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
              <BorderedSection title="Global Resource Quotas">
                <Stack direction="row" spacing={5}>
                  {Object.entries(globalRQs.quotas).map(([entity, details]) => (
                    <RQItem key={`global-${entity}`} entity={entity} details={details} />
                  ))}
                </Stack>
              </BorderedSection>
            </LoadingWrapper>
            <LoadingWrapper isLoading={stageRQsDataIsLoading}>
              <BorderedSection title="Deployment Flow Resource Quotas">
                <Stack direction="row" spacing={5}>
                  {Object.entries(stageRQs.quotas).map(([entity, details]) => (
                    <RQItem key={`stage-${entity}`} entity={entity} details={details} />
                  ))}
                </Stack>
              </BorderedSection>
            </LoadingWrapper>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};
