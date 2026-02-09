import { Icon } from '@iconify/react';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Button, Grid, Paper, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { EmptyList } from '../../../../../../components/EmptyList';
import { ErrorContent } from '../../../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../../../components/LoadingWrapper';
import { StatusIcon } from '../../../../../../components/StatusIcon';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { CodemieApplicationKubeObject } from '../../../../../../k8s/groups/EDP/CodemieApplication';
import { rem } from '../../../../../../utils/styling/rem';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';

export const CodemieApplications = ({
  handleOpenEditor,
}: {
  handleOpenEditor: (data: KubeObjectInterface) => void;
}) => {
  const theme = useTheme();
  const { codemieApplications } = useDynamicDataContext();

  return (
    <>
      <Typography
        fontSize={theme.typography.pxToRem(24)}
        color="primary.dark"
        sx={{ mb: (t) => t.typography.pxToRem(24) }}
      >
        Applications
      </Typography>
      <LoadingWrapper isLoading={codemieApplications.isLoading && !codemieApplications.error}>
        {codemieApplications.error ? (
          <ErrorContent error={codemieApplications.error} outlined />
        ) : codemieApplications.data?.length ? (
          <Grid container spacing={2}>
            {codemieApplications.data?.map((_application) => {
              // @ts-ignore
              const application = _application.jsonData;
              const status = application?.status?.value;
              const statusError = application?.status?.error;

              const [icon, color] = CodemieApplicationKubeObject.getStatusIcon(status);

              return (
                <Grid item xs={12} key={application.metadata.name}>
                  <Paper
                    sx={{ p: (t) => `${t.typography.pxToRem(10)} ${t.typography.pxToRem(20)}` }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
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
                        <Typography variant={'h6'}>{application.metadata.name}</Typography>
                      </Stack>
                      <Button
                        startIcon={<Icon icon={ICONS.PENCIL} />}
                        size="small"
                        component={'button'}
                        style={{ flexShrink: 0 }}
                        color="inherit"
                        onClick={() => handleOpenEditor(application)}
                      >
                        Edit YAML
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <EmptyList customText={'No CodeMie Applications Found.'} />
        )}
      </LoadingWrapper>
    </>
  );
};
