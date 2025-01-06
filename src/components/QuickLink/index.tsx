import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Link as MuiLink } from '@mui/material';
import React from 'react';
import { SYSTEM_QUICK_LINKS } from '../../k8s/groups/EDP/QuickLink/constants';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { ManageQuickLinkDialog } from '../../widgets/dialogs/ManageQuickLink';
import { ResourceIconLink } from '../ResourceIconLink';
import { QuickLinkExternalLinkProps } from './types';

export const QuickLink = ({
  name,
  icon,
  iconBase64,
  externalLink,
  enabledText = `Open in ${name.label}`,
  configurationLink,
  QuickLinkComponent,
  isTextButton = false,
  size = 'small',
  variant = 'outlined',
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
                  setDialog(ManageQuickLinkDialog, {
                    quickLink: QuickLinkComponent,
                    isSystem: Object.hasOwn(SYSTEM_QUICK_LINKS, QuickLinkComponent?.metadata.name),
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
      iconBase64={iconBase64}
      tooltipTitle={enabledText}
      link={externalLink}
      variant={variant}
      isTextButton={isTextButton}
      size={size}
      name={name.label}
    />
  ) : (
    <ResourceIconLink
      disabled
      icon={icon}
      iconBase64={iconBase64}
      tooltipTitle={renderDisabledTooltip()}
      name={name.label}
      variant={variant}
      isTextButton={isTextButton}
      size={size}
    />
  );
};
