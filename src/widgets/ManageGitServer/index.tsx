import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React from 'react';
import { CreateItemAccordion } from '../../components/CreateItemAccordion';
import { StatusIcon } from '../../components/StatusIcon';
import { EDPGitServerKubeObject } from '../../k8s/EDPGitServer';
import { FORM_MODES } from '../../types/forms';
import { rem } from '../../utils/styling/rem';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { ManageGitServerProps } from './types';

export const ManageGitServer = ({ formData }: ManageGitServerProps) => {
  const { gitServer, mode } = formData;

  const [expandedPanel, setExpandedPanel] = React.useState<string>(null);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };
  const handleClosePanel = () => setExpandedPanel(null);

  const _formData = { ...formData, handleClosePanel };

  const connected = gitServer?.status?.connected;
  const error = gitServer?.status?.error;
  const [icon, color] = EDPGitServerKubeObject.getStatusIcon(connected);

  return (
    <Grid container spacing={2} data-testid="form">
      {mode === FORM_MODES.CREATE ? (
        <Grid item xs={12}>
          <CreateItemAccordion
            isExpanded={expandedPanel === mode || !gitServer}
            onChange={handleChange(mode)}
            title={'Add Git Server'}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Create formData={_formData} />
              </Grid>
            </Grid>
          </CreateItemAccordion>
        </Grid>
      ) : mode === FORM_MODES.EDIT ? (
        <Grid item xs={12}>
          <Accordion expanded>
            <AccordionSummary style={{ cursor: 'default' }}>
              <Typography variant={'h6'}>
                <Grid container spacing={1} alignItems={'center'}>
                  <Grid item style={{ marginRight: rem(5) }}>
                    <StatusIcon
                      icon={icon}
                      color={color}
                      Title={
                        <>
                          <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                            {`Connected: ${connected === undefined ? 'Unknown' : connected}`}
                          </Typography>
                          {!!error && (
                            <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                              {error}
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </Grid>
                  <Grid item>{gitServer.metadata.name}</Grid>
                </Grid>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Edit formData={_formData} />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ) : null}
    </Grid>
  );
};
