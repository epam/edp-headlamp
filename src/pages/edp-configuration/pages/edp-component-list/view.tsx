import { Icon } from '@iconify/react';
import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Button, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { EDPComponentKubeObject } from '../../../../k8s/EDPComponent';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { Filter } from '../../../../providers/Filter/components/Filter';
import { useFilterContext } from '../../../../providers/Filter/hooks';
import { ResourceActionListContextProvider } from '../../../../providers/ResourceActionList';
import { FORM_MODES } from '../../../../types/forms';
import { EDPComponentActionsMenu } from '../../../../widgets/EDPComponentActionsMenu';
import { MANAGE_EDP_COMPONENT_DIALOG_NAME } from '../../../../widgets/ManageEDPComponent/constants';
import { menu } from '../../menu';
import { EDPComponentList } from './components/ComponentList';
import { EDP_COMPONENT_LIST_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
  const [items, error] = EDPComponentKubeObject.useList();

  const isLoading = items === null;

  const { filter, setFilter, filterFunction } = useFilterContext();

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
              <Link href={EDP_COMPONENT_LIST_PAGE_DESCRIPTION.docLink} target={'_blank'}>
                <Typography variant={'body2'} component={'span'}>
                  Learn more.
                </Typography>
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems={'flex-end'} justifyContent={'flex-end'}>
                  <Grid item>
                    <Filter
                      controls={{
                        search: true,
                        namespace: true,
                      }}
                      filter={filter}
                      setFilter={setFilter}
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
                      create
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <ResourceActionListContextProvider>
                  <EDPComponentList items={items} error={error} filterFunction={filterFunction} />
                  <EDPComponentActionsMenu />
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
