import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid } from '@material-ui/core';
import { Link as MuiLink } from '@material-ui/core';
import React from 'react';
import { TableColumn } from '../../../../../components/Table/types';
import { ConfigurationItem } from '../../../types';
export const useColumns = (): TableColumn<ConfigurationItem>[] => {
    return React.useMemo(
        () => [
            {
                id: 'name',
                label: 'Name',
                render: ({ icon, label, routePath }) => {
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
                width: '15%',
            },
            {
                id: 'description',
                label: 'Description',
                render: ({ description }) => description,
                width: '70%',
            },
            {
                id: 'documentation',
                label: 'Documentation',
                render: ({ docLink }) => {
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
