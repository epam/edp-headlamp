import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { EDPComponentKubeObject } from '../../../../k8s/EDPComponent';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { Filter } from '../../../../providers/Filter/components/Filter';
import { NamespaceControl } from '../../../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../../../providers/Filter/components/Filter/components/SearchControl';
import { useFilterContext } from '../../../../providers/Filter/hooks';
import { ResourceActionListContextProvider } from '../../../../providers/ResourceActionList';
import { FORM_MODES } from '../../../../types/forms';
import { EDPComponentActionsMenu } from '../../../../widgets/EDPComponentActionsMenu';
import { MANAGE_EDP_COMPONENT_DIALOG_NAME } from '../../../../widgets/ManageEDPComponent/constants';
import { menu } from '../../menu';
import { EDPComponentList } from './components/ComponentList';
import { EDP_COMPONENT_LIST_PAGE_DESCRIPTION } from './constants';
import { routeEDPComponentList } from './route';

export const PageView = () => {
  const [items, error] = EDPComponentKubeObject.useList();

  const isLoading = items === null;

  const { filterFunction } = useFilterContext();

  const { setDialog } = useDialogContext();

  return (
    <PageWithSubMenu list={menu}>
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant={'h1'} gutterBottom>
              {EDP_COMPONENT_LIST_PAGE_DESCRIPTION.label}
            </Typography>
            <Typography variant={'body1'}>
              {EDP_COMPONENT_LIST_PAGE_DESCRIPTION.description}{' '}
              <LearnMoreLink url={EDP_COMPONENT_LIST_PAGE_DESCRIPTION.docLink} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems={'flex-end'} justifyContent={'flex-end'}>
                  <Grid item flexGrow={1}>
                    <Filter
                      controls={{
                        namespace: {
                          gridXs: 3,
                          component: <NamespaceControl />,
                        },
                        search: {
                          gridXs: 3,
                          component: <SearchControl />,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      startIcon={<Icon icon={ICONS.PLUS} />}
                      color={'primary'}
                      variant={'contained'}
                      onClick={() =>
                        setDialog({
                          modalName: MANAGE_EDP_COMPONENT_DIALOG_NAME,
                          forwardedProps: {
                            mode: FORM_MODES.CREATE,
                          },
                        })
                      }
                    >
                      create link
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <ResourceActionListContextProvider>
                  <EDPComponentList items={items} error={error} filterFunction={filterFunction} />
                  <EDPComponentActionsMenu
                    backRoute={Router.createRouteURL(routeEDPComponentList.path)}
                  />
                </ResourceActionListContextProvider>
              </Grid>
            </Grid>
          </Grid>
          {!isLoading && items?.length === 0 && (
            <Grid item xs={12}>
              <EmptyContent color={'textSecondary'}>No components found</EmptyContent>
            </Grid>
          )}
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
