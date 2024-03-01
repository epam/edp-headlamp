import { Icon } from '@iconify/react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React from 'react';
import { CreateItemAccordion } from '../../components/CreateItemAccordion';
import { StatusIcon } from '../../components/StatusIcon';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPGitServerKubeObject } from '../../k8s/EDPGitServer';
import { FORM_MODES } from '../../types/forms';
import { rem } from '../../utils/styling/rem';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { ManageGitServerProps } from './types';

export const ManageGitServer = ({ formData }: ManageGitServerProps) => {
  const { gitServers } = formData;

  const [expandedPanel, setExpandedPanel] = React.useState<string>(null);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };
  const handleClosePanel = () => setExpandedPanel(null);

  return (
    <Grid container spacing={2} data-testid="form">
      <Grid item xs={12}>
        <CreateItemAccordion
          isExpanded={expandedPanel === 'create' || !gitServers.length}
          onChange={handleChange('create')}
          title={'Add Git Server'}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Create
                formData={{
                  mode: FORM_MODES.CREATE,
                  gitServer: null,
                  repositorySecrets: formData.repositorySecrets,
                  handleClosePanel,
                }}
              />
            </Grid>
          </Grid>
        </CreateItemAccordion>
      </Grid>
      {gitServers.map((gitServer) => {
        const connected = gitServer?.status?.connected;
        const error = gitServer?.status?.error;

        const [icon, color] = EDPGitServerKubeObject.getStatusIcon(connected);

        const gitServerName = gitServer.metadata.name;

        const editGitServerFormData = {
          gitServer,
          repositorySecrets: formData.repositorySecrets,
          mode: FORM_MODES.EDIT,
          handleClosePanel,
        };

        return (
          <Grid item xs={12} key={gitServerName}>
            <Accordion
              expanded={expandedPanel === gitServerName}
              onChange={handleChange(gitServerName)}
            >
              <AccordionSummary
                expandIcon={<Icon icon={ICONS.ARROW_DOWN} />}
                style={{
                  cursor: 'pointer',
                }}
              >
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
                    <Grid item>{gitServerName}</Grid>
                  </Grid>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Edit formData={editGitServerFormData} />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        );
      })}
    </Grid>
  );
};
