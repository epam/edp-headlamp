import { Icon } from '@iconify/react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { menu } from '../../menu';
import { usePermissionsContext } from '../../providers/Permissions/hooks';
import { ConfigurationPageContentProps } from './types';

export const ConfigurationPageContent = ({
  creationForm,
  children,
  pageDescription,
}: ConfigurationPageContentProps) => {
  const theme = useTheme();

  const { label, description, docLink } = pageDescription;
  const { secret: permissions } = usePermissionsContext();

  return (
    <>
      <PageWithSubMenu list={menu} title="Configuration">
        <PageWrapper containerMaxWidth={'xl'}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography fontSize={theme.typography.pxToRem(28)} color="primary.dark" gutterBottom>
                {label}
              </Typography>
              {description && (
                <Typography variant={'body1'}>
                  {description} {docLink && <LearnMoreLink url={docLink} />}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={creationForm.onOpen}
                  disabled={creationForm.isDisabled || !permissions.create}
                  startIcon={<Icon icon={ICONS.PLUS} width={20} />}
                >
                  {creationForm.label || 'add'}
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
        </PageWrapper>
      </PageWithSubMenu>
      {creationForm && (
        <Dialog
          open={creationForm.isOpen}
          maxWidth="md"
          fullWidth
          onClose={(e, reason) => reason !== 'backdropClick' && creationForm.onClose()}
        >
          <DialogTitle component="div">
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: '100%' }}
            >
              <Typography variant="h6">{creationForm.label}</Typography>
              <IconButton onClick={creationForm.onClose}>
                <Icon icon={ICONS.CROSS} width={24} />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>{creationForm.component}</DialogContent>
        </Dialog>
      )}
    </>
  );
};
