import { Icon } from '@iconify/react';
import { Box, Button } from '@mui/material';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';

export const CopyButton = ({
  text,
  size = 'small',
}: {
  text: string;
  size?: 'medium' | 'small';
}) => {
  const iconSize = size === 'medium' ? 20 : 15;

  const [showCopied, setShowCopied] = React.useState<boolean>(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleClickCopy = () => {
    navigator.clipboard.writeText(text);
    timeoutRef.current && clearTimeout(timeoutRef.current);

    setShowCopied(true);
    timeoutRef.current = setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  return (
    <Box sx={{ color: 'text.secondary', pt: '0.4%' }}>
      <Button
        onClick={handleClickCopy}
        sx={{ minWidth: 0, p: (t) => t.typography.pxToRem(iconSize / 2.5) }}
        color="inherit"
      >
        <Icon icon={showCopied ? ICONS.CHECK : ICONS.COPY} width={iconSize} height={iconSize} />
      </Button>
    </Box>
  );
};
