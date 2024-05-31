import { ButtonProps } from '@mui/material';

export interface ResourceIconLinkProps {
  tooltipTitle: string | React.ReactElement;
  name: string;
  icon: string;
  link?: string;
  disabled?: boolean;
  withoutDisabledStyle?: boolean;
  isTextButton?: boolean;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
}
