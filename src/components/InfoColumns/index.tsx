import { CircularProgress, Grid, GridSize, Typography } from '@mui/material';
import React from 'react';
import { UseSpriteSymbol } from '../../icons/UseSpriteSymbol';
import { InfoColumnsProps } from './types';

export const InfoColumns = ({ infoRows }: InfoColumnsProps) => {
  return (
    <Grid container spacing={4}>
      {infoRows ? (
        infoRows.map((row, index) => (
          <Grid item xs={12} key={`row::${index}`}>
            <Grid container spacing={2}>
              {row.map(({ label, text, icon, columnXs = 2 }, index) => (
                <React.Fragment key={`column::${index}`}>
                  {!!label && !!text && (
                    <Grid item xs={columnXs as GridSize}>
                      <Typography fontWeight={500} fontSize={14} color="primary.dark" gutterBottom>
                        {label}
                      </Typography>
                      <Grid container spacing={1} alignItems={'center'}>
                        {!!icon && (
                          <Grid item>
                            {typeof icon === 'string' ? (
                              <UseSpriteSymbol name={icon} width={20} height={20} />
                            ) : (
                              icon
                            )}
                          </Grid>
                        )}
                        <Grid item>
                          <Typography
                            fontSize={13}
                            color="secondary.dark"
                            style={{ lineHeight: 1 }}
                          >
                            {text}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        ))
      ) : (
        <CircularProgress style={{ display: 'block', margin: '0 auto' }} />
      )}
    </Grid>
  );
};
