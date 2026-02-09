import { SxProps, Theme } from '@mui/material';

export interface TextWithTooltipProps {
  text: string;
  maxLineAmount?: number;
  textSX?: SxProps<Theme>;
}
