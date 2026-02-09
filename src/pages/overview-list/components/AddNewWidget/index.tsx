import { Icon } from '@iconify/react';
import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { AddNewWidget } from '../../../../widgets/dialogs/AddNewWidget';
import { WidgetConfig } from '../../../../widgets/dialogs/AddNewWidget/types';
import { useStyles } from './styles';

export const AddNewWidgetCard = ({
  userWidgets,
  setUserWidgets,
}: {
  userWidgets: WidgetConfig[];
  setUserWidgets: (widgets: WidgetConfig[]) => void;
}) => {
  const classes = useStyles();

  const { setDialog } = useDialogContext();

  return (
    <IconButton
      className={classes.cardRoot}
      onClick={() => {
        setDialog(AddNewWidget, {
          userWidgets,
          setUserWidgets,
        });
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Icon icon={ICONS.PLUS} width={14} height={14} color={'inherit'} />
        <Typography fontSize="15px" fontWeight={500}>
          ADD WIDGET
        </Typography>
      </Stack>
    </IconButton>
  );
};
