import { Icon } from '@iconify/react';
import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { FORM_MODES } from '../../../../../../types/forms';
import { MANAGE_QUICK_LINK_DIALOG_NAME } from '../../../../../../widgets/ManageQuickLink/constants';
import { usePermissionsContext } from '../../../../providers/Permissions/hooks';
import { useStyles } from './styles';

export const AddNewQuickLinkCard = () => {
  const classes = useStyles();

  const { setDialog } = useDialogContext();
  const { quickLink: permissions } = usePermissionsContext();

  return (
    <IconButton
      className={classes.cardRoot}
      onClick={() =>
        setDialog({
          modalName: MANAGE_QUICK_LINK_DIALOG_NAME,
          forwardedProps: {
            mode: FORM_MODES.CREATE,
          },
        })
      }
      disabled={!permissions.create}
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
