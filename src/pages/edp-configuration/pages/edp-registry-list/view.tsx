import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { CONTAINER_REGISTRY_TYPE_LABEL_MAP } from '../../../../k8s/ConfigMap/constants';
import { getForbiddenError } from '../../../../utils/getForbiddenError';
import { ManageRegistry } from '../../../../widgets/ManageRegistry';
import { ConfigurationPageContent } from '../../components/ConfigurationPageContent';
import { REGISTRY_LIST_PAGE_DESCRIPTION } from './constants';
import { useDynamicDataContext } from './providers/DynamicData/hooks';

export const PageView = () => {
  const { EDPConfigMap, pullAccountSecret, pushAccountSecret, tektonServiceAccount } =
    useDynamicDataContext();

  const error =
    EDPConfigMap.error ||
    pullAccountSecret.error ||
    pushAccountSecret.error ||
    tektonServiceAccount.error;

  const isLoading =
    EDPConfigMap.isLoading ||
    pullAccountSecret.isLoading ||
    pushAccountSecret.isLoading ||
    tektonServiceAccount.isLoading;

  const registryType = EDPConfigMap.data?.data.container_registry_type;

  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

  const handleOpenCreateDialog = () => setCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setCreateDialogOpen(false);

  const renderPageContent = React.useCallback(() => {
    const forbiddenError = getForbiddenError(error);

    if (forbiddenError) {
      return <ErrorContent error={forbiddenError} outlined />;
    }

    if (!registryType && !isLoading && !error) {
      return (
        <>
          <EmptyList
            customText={'No registry integration found.'}
            linkText={'Click here to add integration.'}
            handleClick={handleOpenCreateDialog}
          />
        </>
      );
    }

    return (
      <LoadingWrapper isLoading={isLoading}>
        <Accordion expanded>
          <AccordionSummary style={{ cursor: 'default' }}>
            <Typography variant={'h6'}>
              {CONTAINER_REGISTRY_TYPE_LABEL_MAP[registryType]}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ManageRegistry
                  EDPConfigMap={EDPConfigMap.data}
                  pullAccountSecret={pullAccountSecret.data}
                  pushAccountSecret={pushAccountSecret.data}
                  tektonServiceAccount={tektonServiceAccount.data}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </LoadingWrapper>
    );
  }, [
    EDPConfigMap.data,
    error,
    isLoading,
    pullAccountSecret.data,
    pushAccountSecret.data,
    registryType,
    tektonServiceAccount.data,
  ]);

  return (
    <ConfigurationPageContent
      creationForm={{
        label: 'Add registry',
        component: (
          <ManageRegistry
            EDPConfigMap={EDPConfigMap.data}
            pullAccountSecret={pullAccountSecret.data}
            pushAccountSecret={pushAccountSecret.data}
            tektonServiceAccount={tektonServiceAccount.data}
          />
        ),
        isOpen: isCreateDialogOpen,
        onOpen: handleOpenCreateDialog,
        onClose: handleCloseCreateDialog,
        isDisabled: isLoading || !!registryType,
      }}
      pageDescription={REGISTRY_LIST_PAGE_DESCRIPTION}
    >
      {renderPageContent()}
    </ConfigurationPageContent>
  );
};
