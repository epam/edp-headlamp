import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React from 'react';
import { CreateItemAccordion } from '../../../../components/CreateItemAccordion';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { CONTAINER_REGISTRY_TYPE_LABEL_MAP } from '../../../../k8s/ConfigMap/constants';
import { FORM_MODES } from '../../../../types/forms';
import { ManageRegistry } from '../../../../widgets/ManageRegistry';
import { menu } from '../../menu';
import { REGISTRY_LIST_PAGE_DESCRIPTION } from './constants';
import { useDynamicDataContext } from './providers/DynamicData/hooks';

export const PageView = () => {
  const { EDPConfigMap, pullAccountSecret, pushAccountSecret, tektonServiceAccount } =
    useDynamicDataContext();

  const error =
    EDPConfigMap.error ||
    pullAccountSecret.error ||
    pushAccountSecret.error ||
    tektonServiceAccount.error;

  const isLoading =
    EDPConfigMap.isLoading ||
    pullAccountSecret.isLoading ||
    pushAccountSecret.isLoading ||
    tektonServiceAccount.isLoading;

  const registryType = EDPConfigMap.data?.data.container_registry_type;

  const mode = !!registryType ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  const [expandedPanel, setExpandedPanel] = React.useState<string>(null);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  return (
    <PageWithSubMenu list={menu}>
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant={'h1'} gutterBottom>
              {REGISTRY_LIST_PAGE_DESCRIPTION.label}
            </Typography>
            <Typography variant={'body1'}>
              {REGISTRY_LIST_PAGE_DESCRIPTION.description}{' '}
              <LearnMoreLink url={REGISTRY_LIST_PAGE_DESCRIPTION.docLink} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {error ? (
              <Grid item xs={12}>
                <ErrorContent error={error} outlined />
              </Grid>
            ) : (
              <LoadingWrapper isLoading={isLoading}>
                <Grid container spacing={2}>
                  {mode === FORM_MODES.CREATE ? (
                    <Grid item xs={12}>
                      <CreateItemAccordion
                        isExpanded={expandedPanel === mode || !registryType}
                        onChange={handleChange(mode)}
                        title={'Add Registry'}
                      >
                        <ManageRegistry
                          EDPConfigMap={EDPConfigMap.data}
                          pullAccountSecret={pullAccountSecret.data}
                          pushAccountSecret={pushAccountSecret.data}
                          tektonServiceAccount={tektonServiceAccount.data}
                        />
                      </CreateItemAccordion>
                    </Grid>
                  ) : mode === FORM_MODES.EDIT ? (
                    <Grid item xs={12}>
                      <Accordion expanded>
                        <AccordionSummary style={{ cursor: 'default' }}>
                          <Typography variant={'h6'}>
                            {CONTAINER_REGISTRY_TYPE_LABEL_MAP[registryType]}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <ManageRegistry
                                EDPConfigMap={EDPConfigMap.data}
                                pullAccountSecret={pullAccountSecret.data}
                                pushAccountSecret={pushAccountSecret.data}
                                tektonServiceAccount={tektonServiceAccount.data}
                              />
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  ) : null}
                </Grid>
              </LoadingWrapper>
            )}
            {!isLoading && !error && (
              <Grid item xs={12}>
                <EmptyContent color={'textSecondary'}>
                  No registry configurations found
                </EmptyContent>
              </Grid>
            )}
          </Grid>
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
