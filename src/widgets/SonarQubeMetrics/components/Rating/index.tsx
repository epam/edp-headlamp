import { Avatar } from '@mui/material';
import React from 'react';
import { useStyles } from './styles';

export const Rating = ({ rating, hideValue }: { rating?: string; hideValue?: boolean }) => {
  const classes = useStyles();

  const ratingProp = React.useMemo(() => {
    switch (rating) {
      case '1.0':
        return {
          name: 'A',
          className: classes.ratingA,
        };

      case '2.0':
        return {
          name: 'B',
          className: classes.ratingB,
        };

      case '3.0':
        return {
          name: 'C',
          className: classes.ratingC,
        };

      case '4.0':
        return {
          name: 'D',
          className: classes.ratingD,
        };

      case '5.0':
        return {
          name: 'E',
          className: classes.ratingE,
        };

      default:
        return {
          name: '',
          className: classes.ratingDefault,
        };
    }
  }, [classes, rating]);

  return <Avatar className={ratingProp.className}>{!hideValue && ratingProp.name}</Avatar>;
};
