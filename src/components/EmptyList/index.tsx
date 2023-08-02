import { Icon } from '@iconify/react';
import { Box, Grid, Link, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { rem } from '../../utils/styling/rem';
import { Render } from '../Render';
import { EmptyListProps } from './types';

export const EmptyList = ({
    customText,
    missingItemName,
    linkText = 'Click here to add a new one',
    description,
    handleClick,
}: EmptyListProps) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                sx={{
                    padding: `${theme.typography.pxToRem(32)} ${theme.typography.pxToRem(
                        27
                    )} ${theme.typography.pxToRem(24)}`,
                    maxWidth: theme.typography.pxToRem(640),
                    width: '100%',
                    border: `1px dashed ${theme.palette.divider}`,
                    borderRadius: theme.typography.pxToRem(4),
                }}
            >
                <Box sx={{ mb: theme.typography.pxToRem(16) }}>
                    <Icon
                        icon={ICONS.WARNING}
                        width={theme.typography.pxToRem(30)}
                        height={theme.typography.pxToRem(30)}
                    />
                </Box>
                <Grid
                    container
                    alignItems={'center'}
                    justifyContent={'center'}
                    spacing={1}
                    style={{ marginBottom: rem(5) }}
                >
                    <Grid item>
                        <Typography variant={'body1'}>
                            {customText ? customText : `There are no ${missingItemName} here.`}
                        </Typography>
                    </Grid>
                    <Render condition={!!linkText && !!handleClick}>
                        <Grid item>
                            <Link onClick={handleClick} component={'button'}>
                                <Typography>{linkText}</Typography>
                            </Link>
                        </Grid>
                    </Render>
                </Grid>
                <Render condition={!!description}>
                    <Typography variant={'body2'} color={'textSecondary'}>
                        {description}
                    </Typography>
                </Render>
            </Box>
        </Box>
    );
};
