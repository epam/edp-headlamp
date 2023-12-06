import { Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from './styles';

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
    link: string;
}) => {
    const classes = useStyles();

    return (
        <Link href={link} target={'_blank'} color="inherit" underline="none">
            <Grid item className={classes.root}>
                <Grid item className={classes.upper}>
                    <Grid item className={classes.left}>
                        {leftSlot}
                    </Grid>
                    <Grid item className={classes.right}>
                        {rightSlot}
                    </Grid>
                </Grid>
                <Grid item className={classes.cardTitle}>
                    <Typography variant="body2" className={classes.wrapIcon}>
                        {titleIcon} {title}
                    </Typography>
                </Grid>
            </Grid>
        </Link>
    );
};
