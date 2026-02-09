import { Box } from '@mui/material';
import React from 'react';
import { AppVersion } from '../../../../widgets/AppVersion';
import { WIDGET_TYPE } from '../../../../widgets/dialogs/AddNewWidget/constants';
import { WidgetConfig } from '../../../../widgets/dialogs/AddNewWidget/types';
import { useUserWidgets } from '../../providers/UserWidgets';

const renderer = (
  widgetConfig: WidgetConfig,
  userWidgets: WidgetConfig[],
  setUserWidgets: (widgets: WidgetConfig[]) => void
) => {
  switch (widgetConfig.type) {
    case WIDGET_TYPE.APP_VERSION:
      return (
        <AppVersion
          widgetConfig={widgetConfig as WidgetConfig<{ appName: string }>}
          userWidgets={userWidgets}
          setUserWidgets={setUserWidgets}
        />
      );
    default:
      return null;
  }
};

export const UserWidgetRenderer = ({ widgetConfig }: { widgetConfig: WidgetConfig }) => {
  const { userWidgets, setUserWidgets } = useUserWidgets();

  return (
    <Box
      sx={{
        p: 3,
        borderLeft: (t) => `4px solid ${t.palette.primary.main}`,
        height: '100%',
        boxShadow: '0px 1px 10px 0px #0024461f',
      }}
    >
      {renderer(widgetConfig, userWidgets, setUserWidgets)}
    </Box>
  );
};
