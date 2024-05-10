export interface Tab {
  label: string;
  component: React.ReactNode;
  icon?: React.ReactElement;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  initialTabIdx: string | number;
}
