import { Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useStyles } from './styles';
import { NoDataWidgetWrapperProps } from './types';

export const NoDataWidgetWrapper: React.FC<NoDataWidgetWrapperProps> = ({
    hasData,
    isLoading,
    text = 'No data available.',
    children,
}) => {
    const classes = useStyles();

    return (
        <Paper
            elevation={0}
            className={clsx(classes.wrapper, { [classes.wrapperWithPadding]: isLoading })}
        >
            {!isLoading && !hasData ? (
                <div className={classes.overlap}>
                    <div>
                        {typeof text === 'string' ? (
                            <Typography variant={'body1'}>{text}</Typography>
                        ) : (
                            text
                        )}
                    </div>
                </div>
            ) : null}
            <div className={clsx({ [classes.noContent]: !isLoading && !hasData })}>{children}</div>
        </Paper>
    );
};
