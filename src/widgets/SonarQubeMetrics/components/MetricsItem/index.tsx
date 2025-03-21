import { Link, Stack, Typography } from '@mui/material';
import React from 'react';

export const MetricsItem = ({
  leftSlot,
  rightSlot,
  title,
  titleIcon,
  link,
}: {
  leftSlot: React.ReactNode;
  rightSlot: React.ReactNode;
  title: string;
  titleIcon?: React.ReactNode;
  link: string | undefined;
}) => {
  return (
    <Link href={link} target={'_blank'} color="inherit" underline="none">
      <Stack spacing={1} alignItems="center">
        <Stack spacing={1} alignItems="center" direction="row">
          <div>{leftSlot}</div>
          <div>{rightSlot}</div>
        </Stack>
        <Typography
          fontSize={12}
          color="secondary.dark"
          sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          {titleIcon} {title}
        </Typography>
      </Stack>
    </Link>
  );
};
