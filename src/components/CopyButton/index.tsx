import { Icon } from '@iconify/react';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';

export const CopyButton = ({
  text,
  size = 'medium',
}: {
  text: string;
  size?: 'medium' | 'small';
}) => {
  const iconSize = size === 'medium' ? 20 : 15;

  const [showText, setShowText] = React.useState<boolean>(false);

  const handleClickCopy = () => {
    navigator.clipboard.writeText(text);
    setShowText(true);
    setTimeout(() => {
      setShowText(false);
    }, 500);
  };

  return (
    <Tooltip title="Text Copied" open={showText} placement="top">
      <IconButton onClick={handleClickCopy}>
        <Icon icon={ICONS.COPY} width={iconSize} height={iconSize} />
      </IconButton>
    </Tooltip>
  );
};
