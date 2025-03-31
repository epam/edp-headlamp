import React from 'react';
import { LOCAL_STORAGE_SERVICE } from '../../services/local-storage';
import { TabsContext } from './context';
import { TabsContextProviderProps } from './types';

const LS_LAST_TAB_KEY = (id: string) => `lastTab::${id}`;

export const TabsContextProvider: React.FC<TabsContextProviderProps> = ({
  children,
  rememberLastTab,
  initialTabIdx = 0,
  id,
}) => {
  const [activeTab, setActiveTab] = React.useState<number>(
    rememberLastTab
      ? LOCAL_STORAGE_SERVICE.getItem(LS_LAST_TAB_KEY(id)) || initialTabIdx
      : initialTabIdx
  );

  const handleChangeTab = React.useCallback(
    (event: React.ChangeEvent<{}> | null, newActiveTabIdx: number) => {
      setActiveTab(newActiveTabIdx);

      if (!rememberLastTab) {
        return;
      }

      LOCAL_STORAGE_SERVICE.setItem(LS_LAST_TAB_KEY(id), newActiveTabIdx);
    },
    [id, rememberLastTab]
  );

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        handleChangeTab,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
