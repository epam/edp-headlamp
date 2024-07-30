import { Icon } from '@iconify/react';
import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ButtonWithPermission } from '../../../../components/ButtonWithPermission';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { QuickLinkKubeObject } from '../../../../k8s/groups/EDP/QuickLink';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { Filter } from '../../../../providers/Filter/components/Filter';
import { NamespaceControl } from '../../../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../../../providers/Filter/components/Filter/components/SearchControl';
import { useFilterContext } from '../../../../providers/Filter/hooks';
import { ResourceActionListContextProvider } from '../../../../providers/ResourceActionList';
import { FORM_MODES } from '../../../../types/forms';
import { MANAGE_QUICK_LINK_DIALOG_NAME } from '../../../../widgets/ManageQuickLink/constants';
import { menu } from '../../menu';
import { QuickLinkList } from './components/ComponentList';
import { QUICK_LINK_LIST_PAGE_DESCRIPTION } from './constants';
import { usePermissionsContext } from './providers/Permissions/hooks';

export const PageView = () => {
  const theme = useTheme();
  const [items, error] = QuickLinkKubeObject.useList();

  const isLoading = items === null;

  const { filterFunction } = useFilterContext();

  const { setDialog } = useDialogContext();

  const { quickLink: quickLinkPermissions } = usePermissionsContext();

  return (
    <PageWithSubMenu list={menu} title="Configuration">
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontSize={theme.typography.pxToRem(28)} color="primary.dark" gutterBottom>
              {QUICK_LINK_LIST_PAGE_DESCRIPTION.label}
            </Typography>
            <Typography variant={'body1'}>
              {QUICK_LINK_LIST_PAGE_DESCRIPTION.description}{' '}
              <LearnMoreLink url={QUICK_LINK_LIST_PAGE_DESCRIPTION.docLink} />
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
                    <ButtonWithPermission
                      ButtonProps={{
                        startIcon: <Icon icon={ICONS.PLUS} />,
                        color: 'primary',
                        variant: 'contained',
                        onClick: () => {
                          setDialog({
                            modalName: MANAGE_QUICK_LINK_DIALOG_NAME,
                            forwardedProps: {
                              mode: FORM_MODES.CREATE,
                            },
                          });
                        },
                      }}
                      allowed={quickLinkPermissions.create}
                      text="You do not have permission to create QuickLink"
                    >
                      add link
                    </ButtonWithPermission>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <ResourceActionListContextProvider>
                  <QuickLinkList items={items} error={error} filterFunction={filterFunction} />
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
