import { Icon } from '@iconify/react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { useStyles } from './styles';
import { CreateItemAccordionProps } from './types';

export const CreateItemAccordion: React.FC<CreateItemAccordionProps> = ({
  title,
  isExpanded,
  onChange,
  disabled,
  children,
}) => {
  const classes = useStyles(isExpanded, disabled);

  return (
    <Accordion
      expanded={isExpanded}
      onChange={onChange}
      elevation={0}
      disabled={disabled}
      className={classes.accordion}
    >
      <AccordionSummary>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item>
            <Icon
              icon={ICONS.PLUS}
              className={classes.icon}
              width={20}
              height={20}
              style={{
                opacity: isExpanded ? 0 : 1,
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant={'h6'}>{title}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
