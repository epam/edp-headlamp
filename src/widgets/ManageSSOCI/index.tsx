import { Icon } from '@iconify/react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { CreateItemAccordion } from '../../components/CreateItemAccordion';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { FORM_MODES } from '../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { ManageSSOIntegrationSecretProps } from './types';

export const ManageSSOCI = ({ formData }: ManageSSOIntegrationSecretProps) => {
  const { ssoSecret, ownerReference, mode } = formData;

  const [expandedPanel, setExpandedPanel] = React.useState<string>(null);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };
  const handleClosePanel = () => setExpandedPanel(null);
  const _formData = { ...formData, handleClosePanel };

  return (
    <Grid container spacing={2} data-testid="form">
      {mode === FORM_MODES.CREATE ? (
        <Grid item xs={12}>
          <CreateItemAccordion
            isExpanded={expandedPanel === mode || !ssoSecret}
            onChange={handleChange(mode)}
            title={'Add SSO Integration'}
          >
            <Create formData={_formData} />
          </CreateItemAccordion>
        </Grid>
      ) : mode === FORM_MODES.EDIT ? (
        <Grid item xs={12}>
          <Accordion expanded>
            <AccordionSummary style={{ cursor: 'default' }}>
              <Typography variant={'h6'}>
                <Grid container spacing={1} alignItems={'center'}>
                  <Grid item>{ssoSecret.metadata.name}</Grid>
                  {!!ownerReference && (
                    <Grid item>
                      <Tooltip title={`Managed by ${ownerReference}`}>
                        <Icon
                          icon={ICONS.CLOUD_LOCK}
                          width={20}
                          style={{
                            display: 'block',
                          }}
                        />
                      </Tooltip>
                    </Grid>
                  )}
                </Grid>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Edit formData={_formData} />
            </AccordionDetails>
          </Accordion>
        </Grid>
      ) : null}
    </Grid>
  );
};
