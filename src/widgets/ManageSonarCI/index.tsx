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
import { StatusIcon } from '../../components/StatusIcon';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../k8s/Secret';
import {
  SECRET_ANNOTATION_INTEGRATION_SECRET_CONNECTED,
  SECRET_ANNOTATION_INTEGRATION_SECRET_ERROR,
} from '../../k8s/Secret/annotations';
import { FORM_MODES } from '../../types/forms';
import { rem } from '../../utils/styling/rem';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { ManageSonarIntegrationSecretProps } from './types';

export const ManageSonarCI = ({ formData }: ManageSonarIntegrationSecretProps) => {
  const { sonarSecret, mode, ownerReference } = formData;

  const [expandedPanel, setExpandedPanel] = React.useState<string>(null);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };
  const handleClosePanel = () => setExpandedPanel(null);
  const _formData = { ...formData, handleClosePanel };

  const connected =
    sonarSecret?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_CONNECTED];
  const error = sonarSecret?.metadata?.annotations?.[SECRET_ANNOTATION_INTEGRATION_SECRET_ERROR];

  const [icon, color] = SecretKubeObject.getStatusIcon(connected);

  return (
    <Grid container spacing={2} data-testid="form">
      <Grid item xs={12}>
        <CreateItemAccordion
          isExpanded={expandedPanel === mode}
          onChange={handleChange(mode)}
          title={'Add SonarQube Integration'}
          disabled={mode === FORM_MODES.EDIT}
        >
          {mode === FORM_MODES.CREATE ? <Create formData={_formData} /> : null}
        </CreateItemAccordion>
      </Grid>
      {mode === FORM_MODES.EDIT ? (
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
                  <Grid item>{sonarSecret.metadata.name}</Grid>
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
