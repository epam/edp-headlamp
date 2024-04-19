import { Box, useTheme } from '@mui/material';
import React from 'react';

export const HorizontalScrollContainer: React.FC = ({ children }) => {
  const theme = useTheme();

  const container = React.useRef<HTMLDivElement | null>(null);

  const handler = React.useCallback((e: WheelEvent) => {
    if (container.current) {
      if (
        (e.deltaY < 0 && container.current.scrollLeft > 0) ||
        (e.deltaY > 0 &&
          container.current.scrollLeft <
            container.current.scrollWidth - container.current.clientWidth)
      ) {
        e.preventDefault();
        container.current.scrollLeft += e.deltaY;
      }
    }
  }, []);

  React.useEffect(() => {
    const el = container.current;
    if (el) {
      el.addEventListener('wheel', handler, { passive: false });
    }
    return () => {
      if (el) {
        el.removeEventListener('wheel', handler);
      }
    };
  }, [handler]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        p: theme.typography.pxToRem(5),
      }}
      ref={container}
    >
      {children}
    </Box>
  );
};
