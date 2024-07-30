import { Icon } from '@iconify/react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/groups/default/Secret/labels';
import { FORM_MODES } from '../../../../types/forms';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { getForbiddenError } from '../../../../utils/getForbiddenError';
import { ManageClusterSecret } from '../../../../widgets/ManageClusterSecret';
import { ConfigurationPageContent } from '../../components/ConfigurationPageContent';
import { CLUSTER_LIST_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
  const [clusterSecrets, clusterSecretsError] = SecretKubeObject.useList({
    namespace: getDefaultNamespace(),
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=cluster`,
  });

  const isLoading = clusterSecrets === null && !clusterSecretsError;

  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

  const handleOpenCreateDialog = () => setCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setCreateDialogOpen(false);

  const [expandedPanel, setExpandedPanel] = React.useState<string>(null);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  const renderPageContent = React.useCallback(() => {
    const forbiddenError = getForbiddenError(clusterSecretsError);

    if (forbiddenError) {
      return <ErrorContent error={forbiddenError} outlined />;
    }

    if (!clusterSecrets?.length && !isLoading && !clusterSecretsError) {
      return (
        <>
          <EmptyList
            customText={'No clusters found.'}
            linkText={'Click here to add cluster.'}
            handleClick={handleOpenCreateDialog}
          />
        </>
      );
    }

    const singleItem = clusterSecrets?.length === 1;

    return (
      <LoadingWrapper isLoading={isLoading}>
        <Grid container spacing={2}>
          {clusterSecrets?.map((el) => {
            const secret = el.jsonData;
            const ownerReference = secret?.metadata?.ownerReferences?.[0]?.kind;

            const secretName = secret?.metadata.name;

            const isExpanded = expandedPanel === secretName;

            return (
              <Grid item xs={12} key={secret.metadata.uid}>
                <Accordion expanded={isExpanded} onChange={handleChange(secretName)}>
                  <AccordionSummary
                    expandIcon={singleItem ? null : <Icon icon={ICONS.ARROW_DOWN} />}
                    style={{
                      cursor: singleItem ? 'default' : 'pointer',
                    }}
                  >
                    <Grid container spacing={3} alignItems={'center'}>
                      <Grid item xs={12}>
                        <Typography variant={'h6'} component="div">
                          {secret.metadata.name}
                        </Typography>
                      </Grid>
                      {!!ownerReference && (
                        <Grid item>
                          <Tooltip title={`Managed by ${ownerReference}`}>
                            <Icon
                              icon={ICONS.CLOUD_LOCK}
                              width={20}
                              style={{
                                display: 'block',
                              }}
                            />
                          </Tooltip>
                        </Grid>
                      )}
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ManageClusterSecret
                      formData={{
                        currentElement: secret,
                        mode: FORM_MODES.EDIT,
                        handleClosePlaceholder: handleCloseCreateDialog,
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
              </Grid>
            );
          })}
        </Grid>
      </LoadingWrapper>
    );
  }, [clusterSecrets, clusterSecretsError, expandedPanel, isLoading]);

  return (
    <ConfigurationPageContent
      creationForm={{
        label: 'Add cluster',
        component: (
          <ManageClusterSecret
            formData={{
              mode: FORM_MODES.CREATE,
              handleClosePlaceholder: handleCloseCreateDialog,
            }}
          />
        ),
        isOpen: isCreateDialogOpen,
        onOpen: handleOpenCreateDialog,
        onClose: handleCloseCreateDialog,
        isDisabled: isLoading,
      }}
      pageDescription={CLUSTER_LIST_PAGE_DESCRIPTION}
    >
      {renderPageContent()}
    </ConfigurationPageContent>
  );
};
