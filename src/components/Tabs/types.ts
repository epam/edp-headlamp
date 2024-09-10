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
  initialTabIdx: string | number;
  rememberLastTab?: boolean;
  id?: string;
}
