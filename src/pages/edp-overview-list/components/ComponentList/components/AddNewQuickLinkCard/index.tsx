import { Icon } from '@iconify/react';
import { IconButton, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { FORM_MODES } from '../../../../../../types/forms';
import { MANAGE_QUICK_LINK_DIALOG_NAME } from '../../../../../../widgets/ManageQuickLink/constants';
import { useStyles } from './styles';

export const AddNewQuickLinkCard = () => {
  const classes = useStyles();
  const theme = useTheme();

  const { setDialog } = useDialogContext();

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
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Icon icon={ICONS.PLUS} width={14} height={14} color={theme.palette.primary.dark} />
        <Typography fontSize="15px" fontWeight={500}>
          ADD LINK
        </Typography>
      </Stack>
    </IconButton>
  );
};
