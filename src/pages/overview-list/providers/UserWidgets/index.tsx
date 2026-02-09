import React from 'react';
import { LOCAL_STORAGE_SERVICE } from '../../../../services/local-storage';
import { WidgetConfig } from '../../../../widgets/dialogs/AddNewWidget/types';

const UserWidgetsContext = React.createContext<
  { userWidgets: WidgetConfig[]; setUserWidgets: (widgets: WidgetConfig[]) => void } | undefined
>(undefined);

export const UserWidgetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userWidgets, setUserWidgetsInState] = React.useState<WidgetConfig[]>(() => {
    return LOCAL_STORAGE_SERVICE.getItem('userWidgets') || [];
  });

  React.useEffect(() => {
    LOCAL_STORAGE_SERVICE.setItem('userWidgets', userWidgets);
  }, [userWidgets]);

  const setUserWidgets = React.useCallback((widgets: WidgetConfig[]) => {
    setUserWidgetsInState(widgets);
  }, []);

  return (
    <UserWidgetsContext.Provider value={{ userWidgets, setUserWidgets }}>
      {children}
    </UserWidgetsContext.Provider>
  );
};

export const useUserWidgets = () => {
  const context = React.useContext(UserWidgetsContext);
  if (!context) {
    throw new Error('useUserWidgets must be used within a UserWidgetsProvider');
  }
  return context;
};
