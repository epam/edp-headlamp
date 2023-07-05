import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Typography } from '@material-ui/core';
import { Link as MuiLink } from '@material-ui/core';
import React from 'react';
import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { sortByActiveStatus } from '../../../../../utils/sort/sortByActiveStatus';
import { ConfigurationItem } from '../../../types';
export const useColumns = (): HeadlampSimpleTableGetterColumn<ConfigurationItem>[] => {
    return React.useMemo(
        () => [
            {
                label: 'Name',
                getter: ({ icon, label, routePath }) => {
                    return (
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item>
                                <Icon icon={icon} color="inherit" />
                            </Grid>
                            <Grid item>
                                <Link routeName={routePath}>{label}</Link>
                            </Grid>
                        </Grid>
                    );
                },
                sort: (a, b) => sortByActiveStatus(a.label, b.label),
            },
            {
                label: 'Description',
                getter: ({ description }) => {
                    return <Typography variant={'subtitle1'}>{description}</Typography>;
                },
            },
            {
                label: 'Documentation',
                getter: ({ docLink }) => {
                    return docLink ? (
                        <MuiLink href={docLink} target={'_blank'}>
                            User guide
                        </MuiLink>
                    ) : null;
                },
            },
        ],
        []
    );
};
