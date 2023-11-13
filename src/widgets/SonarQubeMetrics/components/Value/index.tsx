import { Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from './styles';

export const Value = (props: { value?: string }) => {
    const classes = useStyles();

    return (
        <Typography component="span" className={classes.value}>
            {props.value}
        </Typography>
    );
};
