export interface EmptyListProps {
  missingItemName?: string;
  customText?: string;
  description?: string;
  linkText?: string;
  beforeLinkText?: string;
  handleClick?: () => void;
  isSearch?: boolean;
  icon?: React.ReactNode;
  iconSize?: number;
}
