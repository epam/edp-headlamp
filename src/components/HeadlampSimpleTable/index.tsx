import { SimpleTable } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { useStyles } from './styles';
import { HeadlampSimpleTableProps } from './types';

export const HeadlampSimpleTable: React.FC<HeadlampSimpleTableProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.tableWrapper}>
      <SimpleTable {...props} />
    </div>
  );
};
