import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Link as MuiLink } from '@mui/material';
import React from 'react';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { FORM_MODES } from '../../types/forms';
import { MANAGE_QUICK_LINK_DIALOG_NAME } from '../../widgets/ManageQuickLink/constants';
import { ResourceIconLink } from '../ResourceIconLink';
import { QuickLinkExternalLinkProps } from './types';

export const QuickLink = ({
  name,
  icon,
  externalLink,
  enabledText = `Open in ${name.label}`,
  configurationLink,
  QuickLinkComponent,
  variant = 'icon',
  size = 'medium',
}: QuickLinkExternalLinkProps) => {
  const { setDialog } = useDialogContext();

  const renderDisabledTooltip = React.useCallback(() => {
    return (
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
          {!!QuickLinkComponent && (
            <Grid item>
              Please, set up {name.label}{' '}
              <MuiLink
                component="button"
                onClick={() =>
                  setDialog({
                    modalName: MANAGE_QUICK_LINK_DIALOG_NAME,
                    forwardedProps: {
                      QuickLink: QuickLinkComponent,
                      mode: FORM_MODES.EDIT,
                    },
                  })
                }
              >
                here
              </MuiLink>
            </Grid>
          )}
        </Grid>
      </>
    );
  }, [QuickLinkComponent, configurationLink, name.label, setDialog]);

  return externalLink ? (
    <ResourceIconLink
      icon={icon}
      tooltipTitle={enabledText}
      link={externalLink}
      variant={variant}
      size={size}
      name={name.label}
    />
  ) : (
    <ResourceIconLink
      disabled
      icon={icon}
      tooltipTitle={renderDisabledTooltip()}
      name={name.label}
      variant={variant}
      size={size}
    />
  );
};
