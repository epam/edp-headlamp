import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid } from '@mui/material';
import React from 'react';
import { ResourceIconLink } from '../ResourceIconLink';
import { QuickLinkExternalLinkProps } from './types';

export const QuickLink = ({
  name,
  icon,
  externalLink,
  enabledText = `Open in ${name.label}`,
  configurationLink,
}: QuickLinkExternalLinkProps) => {
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
            {!!configurationLink && (
              <Grid item>
                Please, set up {name.label}{' '}
                <Link
                  routeName={configurationLink?.routeName}
                  params={configurationLink?.routeParams}
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
