export interface TabsContextProviderValue {
  activeTab: number;
  handleChangeTab: (event: React.ChangeEvent<{}>, newActiveTabIdx: number) => void;
}

export interface TabsContextProviderProps {
  initialTabIdx?: number;
  id: string;
  rememberLastTab?: boolean;
}
