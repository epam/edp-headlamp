import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid } from '@material-ui/core';
import React from 'react';
import { routeEDPComponentDetails } from '../../pages/edp-configuration/pages/edp-component-details/route';
import { ResourceIconLink } from '../ResourceIconLink';
import { EDPComponentExternalLinkProps } from './types';

export const EDPComponentExternalLink = ({
    name,
    icon,
    externalLink,
    namespace,
    enabledText = `Open in ${name.label}`,
    noConfigurationLink,
}: EDPComponentExternalLinkProps) => {
    return externalLink ? (
        <ResourceIconLink icon={icon} tooltipTitle={enabledText} link={externalLink} />
    ) : (
        <ResourceIconLink
            disabled
            icon={icon}
            tooltipTitle={
                <>
                    <Grid container spacing={1}>
                        <Grid item>Link to {name.label} is not available.</Grid>
                        {!noConfigurationLink && (
                            <Grid item>
                                Please, set up {name.label}{' '}
                                <Link
                                    routeName={routeEDPComponentDetails.path}
                                    params={{
                                        name: name.value,
                                        namespace,
                                    }}
                                >
                                    here
                                </Link>
                            </Grid>
                        )}
                    </Grid>
                </>
            }
        />
    );
};
