export interface Tab {
  label: string;
  component: React.ReactNode;
  icon?: React.ReactElement;
  disabled?: boolean;
  highlightNew?: boolean;
  onClick?: () => void;
}

export interface TabsProps {
  tabs: Tab[];
  activeTabIdx: number;
  handleChangeTab: (event: React.ChangeEvent<{}>, newActiveTabIdx: number) => void;
}
