import { Icon } from '@iconify/react';
import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { ManageQuickLinkDialog } from '../../../../../../widgets/dialogs/ManageQuickLink';
import { useTypedPermissions } from '../../../../hooks/useTypedPermissions';
import { useStyles } from './styles';

export const AddNewQuickLinkCard = () => {
  const classes = useStyles();

  const { setDialog } = useDialogContext();
  const permissions = useTypedPermissions();

  return (
    <IconButton
      className={classes.cardRoot}
      onClick={() => setDialog(ManageQuickLinkDialog, { quickLink: null })}
      disabled={!permissions.create.QuickLink}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Icon icon={ICONS.PLUS} width={14} height={14} color={'inherit'} />
        <Typography fontSize="15px" fontWeight={500}>
          ADD LINK
        </Typography>
      </Stack>
    </IconButton>
  );
};
