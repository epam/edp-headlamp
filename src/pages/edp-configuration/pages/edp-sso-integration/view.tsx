import { Icon } from '@iconify/react';
import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { Table } from '../../../../components/Table';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/Secret/labels';
import { FORM_MODES } from '../../../../types/forms';
import { getForbiddenError } from '../../../../utils/getForbiddenError';
import { ManageSSOCI } from '../../../../widgets/ManageSSOCI';
import { ConfigurationPageContent } from '../../components/ConfigurationPageContent';
import { SSO_INTEGRATION_PAGE_DESCRIPTION } from './constants';
import { useColumns } from './hooks/useColumns';

export const PageView = () => {
  const [ssoSecrets, ssoSecretsError] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=keycloak`,
  });

  const ssoSecret = ssoSecrets?.[0]?.jsonData;

  const mode = !!ssoSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const ownerReference = ssoSecret?.metadata?.ownerReferences?.[0]?.kind;

  const [ingresses, ingressesError] = K8s.ingress.default.useList();

  const OAuthIngresses = React.useMemo(
    () =>
      ingresses
        ? ingresses.filter((ingress) => {
            return 'nginx.ingress.kubernetes.io/auth-url' in ingress.metadata.annotations;
          })
        : null,
    [ingresses]
  );

  const error = ssoSecretsError || ingressesError;
  const isLoading = (ssoSecrets === null || ingresses === null) && !error;

  const columns = useColumns();

  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

  const handleOpenCreateDialog = () => setCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setCreateDialogOpen(false);

  const renderPageContent = React.useCallback(() => {
    const forbiddenError = getForbiddenError(error);

    if (forbiddenError) {
      return <ErrorContent error={forbiddenError} outlined />;
    }

    if (!ssoSecret && !isLoading && !error) {
      return (
        <>
          <EmptyList
            customText={'No SSO integration secrets found.'}
            linkText={'Click here to add integration.'}
            handleClick={handleOpenCreateDialog}
          />
        </>
      );
    }

    const ownerReference = ssoSecret?.metadata?.ownerReferences?.[0]?.kind;

    return (
      <LoadingWrapper isLoading={isLoading}>
        <Accordion expanded>
          <AccordionSummary style={{ cursor: 'default' }}>
            <Typography variant={'h6'}>
              <Grid container spacing={1} alignItems={'center'}>
                <Grid item>{ssoSecret?.metadata.name}</Grid>
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
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ManageSSOCI
              formData={{
                ssoSecret,
                ownerReference,
                isReadOnly: !!ownerReference,
                mode,
              }}
            />
          </AccordionDetails>
        </Accordion>
      </LoadingWrapper>
    );
  }, [error, isLoading, mode, ssoSecret]);

  return (
    <ConfigurationPageContent
      creationForm={{
        label: 'Add Integration',
        component: (
          <ManageSSOCI
            formData={{
              ssoSecret,
              ownerReference,
              isReadOnly: !!ownerReference,
              mode,
            }}
          />
        ),
        isOpen: isCreateDialogOpen,
        onOpen: handleOpenCreateDialog,
        onClose: handleCloseCreateDialog,
        isDisabled: isLoading || !!ssoSecret,
      }}
      pageDescription={SSO_INTEGRATION_PAGE_DESCRIPTION}
    >
      <Stack spacing={2}>
        <div>{renderPageContent()}</div>
        <div>
          <Typography variant="h4" gutterBottom component="span">
            Ingresses
          </Typography>
          <Table<KubeObjectInterface>
            isLoading={OAuthIngresses === null}
            data={OAuthIngresses}
            error={ingressesError}
            columns={columns}
          />
        </div>
      </Stack>
    </ConfigurationPageContent>
  );
};
