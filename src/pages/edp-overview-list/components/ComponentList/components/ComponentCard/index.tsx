import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Link as MuiLink,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { routeQuickLinkDetails } from '../../../../../edp-configuration/pages/edp-quick-link-details/route';
import { useStyles } from './styles';
import { ComponentCardProps } from './types';

const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

export const ComponentCard = ({ component }: ComponentCardProps) => {
  const classes = useStyles();
  const {
    spec: { url, visible, icon },
    metadata: { name },
  } = component;
  const _url = !/^https?:\/\//i.test(url) ? `https://${url}` : url;

  return (
    <Card className={classes.cardRoot}>
      <CardContent className={classes.cardContent}>
        <div>
          <Grid
            container
            spacing={2}
            alignItems={'center'}
            justifyContent={'center'}
            wrap={'nowrap'}
          >
            <Grid item>
              {!!visible ? (
                <MuiLink href={url} target="_blank" rel="noopener">
                  <span className={classes.serviceItemIcon}>
                    <img src={`data:image/svg+xml;base64,${icon}`} alt="" />
                  </span>
                </MuiLink>
              ) : (
                <Icon icon={'ph:placeholder-light'} className={classes.serviceItemIcon} />
              )}
            </Grid>
          </Grid>
        </div>
        <div className={classes.cardBack}>
          <Grid container spacing={1} justifyContent={'center'}>
            <Grid item xs={12}>
              <Tooltip title={name} placement={'top'}>
                <Typography variant={'body2'} align={'center'} className={classes.cardTitle}>
                  {name}
                </Typography>
              </Tooltip>
            </Grid>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <Grid item onClick={stopPropagation} onFocus={stopPropagation}>
              <Tooltip title={'Edit'}>
                <IconButton
                  component={Link}
                  routeName={routeQuickLinkDetails.path}
                  params={{
                    name: component.metadata.name,
                    namespace: component.metadata.namespace,
                  }}
                  size={'small'}
                >
                  <Icon icon={ICONS.PENCIL} color={'#fff'} width="20" />
                </IconButton>
              </Tooltip>
            </Grid>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <Grid item onClick={stopPropagation} onFocus={stopPropagation}>
              <Tooltip
                title={
                  <Grid container alignItems={'center'} spacing={1}>
                    <Grid item>{'Open in new tab'}</Grid>
                    <span> </span>
                    {!!_url && (
                      <Grid item>
                        <Icon icon={ICONS.NEW_WINDOW} color={'#fff'} width="15" />
                      </Grid>
                    )}
                  </Grid>
                }
              >
                <IconButton
                  component={MuiLink}
                  href={_url}
                  target={'_blank'}
                  disabled={!_url}
                  size={'small'}
                >
                  <Icon icon={ICONS.NEW_WINDOW} color={'#fff'} width="20" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};
