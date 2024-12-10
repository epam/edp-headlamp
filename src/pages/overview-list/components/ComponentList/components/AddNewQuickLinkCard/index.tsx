import { Icon } from '@iconify/react';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../../../../../../components/ConditionalWrapper';
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
    <ConditionalWrapper
      condition={!permissions?.create?.QuickLink.allowed}
      wrapper={(children) => (
        <Tooltip title={permissions?.create?.QuickLink.reason}>
          <div>{children}</div>
        </Tooltip>
      )}
    >
      <IconButton
        className={classes.cardRoot}
        onClick={() => setDialog(ManageQuickLinkDialog, { quickLink: null })}
        disabled={!permissions?.create?.QuickLink.allowed}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Icon icon={ICONS.PLUS} width={14} height={14} color={'inherit'} />
          <Typography fontSize="15px" fontWeight={500}>
            ADD LINK
          </Typography>
        </Stack>
      </IconButton>
    </ConditionalWrapper>
  );
};
