import { Icon } from '@iconify/react';
import { Button, Grid, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { StagesProps } from './types';

export const Stages = ({ stages, handleDeleteStage, handleClickAddStage }: StagesProps) => {
  const theme: DefaultTheme = useTheme();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
          <Grid item>
            <Typography variant={'h6'}>Stages</Typography>
          </Grid>
          <Grid item>
            <Tooltip
              title={
                'Stages serve as namespaces for application deployments. While this namespace can be manually configured, the default naming convention follows the format: <edp-namespace-name>-<environment-name>-<stage-name>.'
              }
            >
              <Icon icon={ICONS.INFO_CIRCLE} width={18} />
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems={'center'}>
          {!!stages.length ? (
            <>
              {stages.map(({ spec: { name } }, idx) => {
                const key = `stage::${name}::${idx}`;

                return (
                  <React.Fragment key={key}>
                    <Grid item xs={11}>
                      <Typography>{name}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Button
                        type={'button'}
                        size={'small'}
                        component={'button'}
                        style={{ minWidth: 0 }}
                        onClick={() => handleDeleteStage(idx)}
                      >
                        <Icon icon={ICONS['BUCKET']} width={20} color={theme.palette.grey['500']} />
                      </Button>
                    </Grid>
                  </React.Fragment>
                );
              })}
            </>
          ) : null}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          type={'button'}
          size={'small'}
          component={'button'}
          style={{ minWidth: 0 }}
          variant={'contained'}
          onClick={handleClickAddStage}
        >
          add stage
        </Button>
      </Grid>
    </Grid>
  );
};
