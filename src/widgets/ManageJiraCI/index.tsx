import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React from 'react';
import { CreateItemAccordion } from '../../components/CreateItemAccordion';
import { StatusIcon } from '../../components/StatusIcon';
import { JiraServerKubeObject } from '../../k8s/JiraServer';
import { FORM_MODES } from '../../types/forms';
import { rem } from '../../utils/styling/rem';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { ManageJiraCIProps } from './types';

export const ManageJiraCI = ({ formData }: ManageJiraCIProps) => {
  const { jiraServer, jiraServerSecret, mode } = formData;

  const [expandedPanel, setExpandedPanel] = React.useState<string>(null);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };
  const handleClosePanel = () => setExpandedPanel(null);

  const _formData = { ...formData, handleClosePanel };

  const status = jiraServer?.status?.status;
  const error = jiraServer?.status?.detailed_message;

  const [icon, color] = JiraServerKubeObject.getStatusIcon(status);

  return (
    <Grid container spacing={2} data-testid="form">
      {mode === FORM_MODES.CREATE ? (
        <Grid item xs={12}>
          <CreateItemAccordion
            isExpanded={expandedPanel === mode || !jiraServerSecret}
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
                            {`Status: ${status === undefined ? 'Unknown' : status}`}
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
                  <Grid item>Jira</Grid>
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
