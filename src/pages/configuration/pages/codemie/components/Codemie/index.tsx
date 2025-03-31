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
import { EmptyList } from '../../../../../../components/EmptyList';
import { ErrorContent } from '../../../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../../../components/LoadingWrapper';
import { StatusIcon } from '../../../../../../components/StatusIcon';
import { EDP_USER_GUIDE } from '../../../../../../constants/urls';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { CodemieKubeObject } from '../../../../../../k8s/groups/EDP/Codemie';
import { getForbiddenError } from '../../../../../../utils/getForbiddenError';
import { rem } from '../../../../../../utils/styling/rem';
import { ManageCodeMie } from '../../../../../../widgets/ManageCodeMie';
import { useTypedPermissions } from '../../hooks/useTypedPermissions';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';

const extraInfoLink = EDP_USER_GUIDE.ADD_AI_ASSISTANT.url;

export const CodemieSection = ({
  handleOpenCreateDialog,
  handleCloseCreateDialog,
}: {
  handleOpenCreateDialog: () => void;
  handleCloseCreateDialog: () => void;
}) => {
  const { codemie, codemieProject, codemieQuickLink, codemieSecret } = useDynamicDataContext();

  const error = codemie.error || codemieSecret.error || codemieProject.error;
  const isLoading = codemie.isLoading || codemieSecret.isLoading || codemieProject.isLoading;

  const forbiddenError = error && getForbiddenError(error);
  const permissions = useTypedPermissions();

  if (forbiddenError) {
    return <ErrorContent error={forbiddenError} extraInfoLink={extraInfoLink} outlined />;
  }

  if (codemie.error) {
    return <ErrorContent error={codemie.error} extraInfoLink={extraInfoLink} outlined />;
  }

  if (codemieSecret.error) {
    return <ErrorContent error={codemieSecret.error} extraInfoLink={extraInfoLink} outlined />;
  }

  if (codemieProject.error) {
    return <ErrorContent error={codemieProject.error} extraInfoLink={extraInfoLink} outlined />;
  }

  if (!codemie.isLoading && !codemie.data && !codemieSecret.isLoading && !codemieSecret.data) {
    return (
      <>
        <EmptyList
          customText={'No CodeMie integration found.'}
          linkText={'Click here to add integration.'}
          handleClick={handleOpenCreateDialog}
        />
      </>
    );
  }

  const ownerReference = codemieSecret.data?.metadata?.ownerReferences?.[0]?.kind;

  const status = codemieProject.data?.status?.value;
  const statusError = codemieProject.data?.status?.error;

  const [icon, color] = CodemieKubeObject.getStatusIcon(status);

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Accordion expanded>
        <AccordionSummary style={{ cursor: 'default' }}>
          <Typography variant={'h6'}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item style={{ marginRight: rem(5) }}>
                <StatusIcon
                  icon={icon}
                  color={color}
                  Title={
                    <>
                      <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                        {`Status: ${status || 'Unknown'}`}
                      </Typography>
                      {!!statusError && (
                        <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                          {statusError}
                        </Typography>
                      )}
                    </>
                  }
                />
              </Grid>
              <Grid item>{codemieProject.data?.metadata.name}</Grid>
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
          <ManageCodeMie
            quickLink={codemieQuickLink.data!}
            codemie={codemie.data!}
            codemieSecret={codemieSecret.data!}
            permissions={permissions}
            handleClosePanel={handleCloseCreateDialog}
          />
        </AccordionDetails>
      </Accordion>
    </LoadingWrapper>
  );
};
