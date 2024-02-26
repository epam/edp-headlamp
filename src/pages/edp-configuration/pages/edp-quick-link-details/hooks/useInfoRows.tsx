import { Icon } from '@iconify/react';
import { Grid, Link, Typography, useTheme } from '@mui/material';
import React from 'react';
import { InfoRow } from '../../../../../components/InfoColumns/types';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { QuickLinkKubeObjectInterface } from '../../../../../k8s/QuickLink/types';
import { useStyles } from '../styles';

export const useInfoRows = (QuickLink: QuickLinkKubeObjectInterface): InfoRow[] | null => {
  const theme = useTheme();
  const classes = useStyles();

  return React.useMemo(() => {
    if (!QuickLink) {
      return [];
    }

    const {
      spec: { visible, url, type, icon },
    } = QuickLink;
    const _url = !/^https?:\/\//i.test(url) ? `https://${url}` : url;

    return [
      [
        {
          label: 'Icon',
          text: visible ? (
            <span className={classes.serviceItemIcon}>
              <img src={`data:image/svg+xml;base64,${icon}`} alt="" />
            </span>
          ) : (
            <Icon icon={'ph:placeholder-light'} className={classes.serviceItemIcon} />
          ),
        },
        {
          label: 'Component URL',
          text: visible ? (
            <Link href={_url} target="_blank" rel="noopener">
              <Grid container alignItems={'center'} spacing={1}>
                <Grid item>Open in a new tab</Grid>
                <span> </span>
                <Grid item>
                  <Icon icon={ICONS.NEW_WINDOW} color={theme.palette.grey['500']} width="15" />
                </Grid>
              </Grid>
            </Link>
          ) : (
            <Typography>{type}</Typography>
          ),
        },
        {
          label: 'Visible',
          text: <Icon icon={visible ? ICONS.ACCEPT_ARROW : ICONS.CROSS} width="20" />,
        },
      ],
    ];
  }, [QuickLink, classes.serviceItemIcon, theme.palette.grey]);
};
