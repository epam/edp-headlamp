import { NameValueTable } from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import { useStyles } from './styles';
import { HeadlampNameValueTableProps } from './types';

export const HeadlampNameValueTable: React.FC<HeadlampNameValueTableProps> = props => {
    const classes = useStyles();
    return (
        <div className={classes.tableWrapper}>
            <NameValueTable {...props} />
        </div>
    );
};
