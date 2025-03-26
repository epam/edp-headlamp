import { Icon } from '@iconify/react';
import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ButtonWithPermission } from '../../../../components/ButtonWithPermission';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { QuickLinkKubeObject } from '../../../../k8s/groups/EDP/QuickLink';
import { QuickLinkKubeObjectInterface } from '../../../../k8s/groups/EDP/QuickLink/types';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { Filter } from '../../../../providers/Filter/components/Filter';
import { NamespaceControl } from '../../../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../../../providers/Filter/components/Filter/components/SearchControl';
import { useFilterContext } from '../../../../providers/Filter/hooks';
import { ResourceActionListContextProvider } from '../../../../providers/ResourceActionList/provider';
import { getClusterSettings } from '../../../../utils/getClusterSettings';
import { ManageQuickLinkDialog } from '../../../../widgets/dialogs/ManageQuickLink';
import { menu } from '../../menu';
import { QuickLinkList } from './components/ComponentList';
import { pageDescription } from './constants';
import { useTypedPermissions } from './hooks/useTypedPermissions';

export const PageView = () => {
  const theme = useTheme();
  const [quickLinks, setQuickLinks] = React.useState<QuickLinkKubeObjectInterface[] | null>(null);
  const [quickLinksErrors, setQuickLinksErrors] = React.useState<ApiError[] | null>(null);

  QuickLinkKubeObject.useApiList(
    (data) => setQuickLinks(data),
    (error) => {
      setQuickLinksErrors((prev) => (prev ? [...prev, error] : [error]));
    }
  );

  const isLoading = quickLinks === null;

  const { filterFunction } = useFilterContext();

  const { setDialog } = useDialogContext();

  const permissions = useTypedPermissions();

  return (
    <PageWithSubMenu list={menu} title="Configuration">
      <PageWrapper containerMaxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontSize={theme.typography.pxToRem(28)} color="primary.dark" gutterBottom>
              {pageDescription.label}
            </Typography>
            <Typography variant={'body1'}>
              {pageDescription.description}{' '}
              {pageDescription.docLink && <LearnMoreLink url={pageDescription.docLink} />}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems={'flex-end'} justifyContent={'flex-end'}>
                  <Grid item flexGrow={1}>
                    <Filter
                      controls={{
                        search: {
                          gridXs: 3,
                          component: <SearchControl />,
                        },
                        ...((getClusterSettings()?.allowedNamespaces || []).length > 1
                          ? {
                              namespace: {
                                component: <NamespaceControl />,
                              },
                            }
                          : {}),
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
                          setDialog(ManageQuickLinkDialog, { quickLink: undefined });
                        },
                      }}
                      disabled={!permissions.create.QuickLink.allowed}
                      reason={permissions.create.QuickLink.reason}
                    >
                      add link
                    </ButtonWithPermission>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <ResourceActionListContextProvider>
                  <QuickLinkList
                    items={quickLinks}
                    errors={quickLinksErrors}
                    filterFunction={filterFunction}
                  />
                </ResourceActionListContextProvider>
              </Grid>
            </Grid>
          </Grid>
          {!isLoading && quickLinks?.length === 0 && (
            <Grid item xs={12}>
              <EmptyContent color={'textSecondary'}>No QuickLinks found</EmptyContent>
            </Grid>
          )}
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};
