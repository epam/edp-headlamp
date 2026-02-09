import { Box, SxProps, Theme, Tooltip } from '@mui/material';
import React from 'react';
import { TextWithTooltipProps } from './types';

export const TextWithTooltip = ({ text, textSX, maxLineAmount = 1 }: TextWithTooltipProps) => {
  const [isOverflowed, setIsOverflowed] = React.useState(false);
  const textRef = React.useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (textRef.current) {
      const isOverflow =
        textRef.current.offsetWidth < textRef.current.scrollWidth ||
        textRef.current.offsetHeight < textRef.current.scrollHeight;
      setIsOverflowed(isOverflow);
    }
  };

  const calculatedSX = React.useMemo(() => {
    const base: SxProps<Theme> = {
      fontSize: (t) => t.typography.pxToRem(14),
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      WebkitLineClamp: maxLineAmount,
      WebkitBoxOrient: 'vertical',
      display: '-webkit-box',
      wordBreak: 'break-word',
    };

    return textSX ? { ...base, ...textSX } : base;
  }, [maxLineAmount, textSX]);

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [text, maxLineAmount, textSX]);

  const Content = (
    <Box ref={textRef} sx={calculatedSX}>
      {text}
    </Box>
  );

  return isOverflowed ? <Tooltip title={text}>{Content}</Tooltip> : Content;
};
