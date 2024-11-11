import React from 'react';

export const TabsContext = React.createContext({
  activeTab: 0,
  // eslint-disable-next-line no-unused-vars
  handleChangeTab: (_event: React.ChangeEvent<{}>, _newActiveTabIdx: number) => {
    //
  },
});
