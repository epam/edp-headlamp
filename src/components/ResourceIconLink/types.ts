export interface ResourceIconLinkProps {
  tooltipTitle: string | React.ReactElement;
  name: string;
  icon: string;
  link?: string;
  disabled?: boolean;
  withoutDisabledStyle?: boolean;
  variant?: 'icon' | 'text';
}
