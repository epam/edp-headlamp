import { Icon } from '@iconify/react';
import { Box, IconButton, Stack, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../components/LearnMoreLink';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { GitServerKubeObject } from '../../k8s/groups/EDP/GitServer';
import { useFilterContext } from '../../providers/Filter/hooks';
import { useViewModeContext } from '../../providers/ViewMode/hooks';
import { VIEW_MODES } from '../../providers/ViewMode/types';
import { MarketplaceList } from './components/MarketplaceList';
import { TemplatesWarning } from './components/MarketplaceList/components/TemplatesWarning';

export const PageView = () => {
  const theme = useTheme();
  const { viewMode, handleChangeViewMode } = useViewModeContext();

  const [gitServers, gitServersError] = GitServerKubeObject.useList();
  const hasAtLeastOneGitServer = gitServers?.length > 0;
  const gitServersIsLoading = gitServers === null && !gitServersError;

  const { filterFunction } = useFilterContext();

  return (
    <PageWrapper>
      <Section
        title="Marketplace"
        description={
          <>
            Effortlessly scaffold applications using predefined templates crafted for various use
            cases. <LearnMoreLink url={EDP_USER_GUIDE.MARKETPLACE_CREATE_APP.url} />
          </>
        }
      >
        <Stack spacing={3}>
          <Stack direction="row" spacing={2} alignItems={'flex-end'} justifyContent={'flex-end'}>
            <Box flexGrow={1}></Box>
            <Stack direction="row" spacing={0} alignItems={'center'} justifyContent={'flex-end'}>
              <Tooltip title={'Block View'}>
                <IconButton onClick={() => handleChangeViewMode(VIEW_MODES.GRID)} size="large">
                  <Icon
                    icon={ICONS.VIEW_GRID}
                    color={viewMode === VIEW_MODES.GRID ? theme.palette.primary.main : 'inherit'}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title={'List View'}>
                <IconButton onClick={() => handleChangeViewMode(VIEW_MODES.TABLE)} size="large">
                  <Icon
                    icon={ICONS.VIEW_TABLE}
                    color={viewMode === VIEW_MODES.TABLE ? theme.palette.primary.main : 'inherit'}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
          <LoadingWrapper isLoading={gitServersIsLoading}>
            <MarketplaceList
              filterFunction={filterFunction}
              warning={hasAtLeastOneGitServer ? null : <TemplatesWarning />}
            />
          </LoadingWrapper>
        </Stack>
      </Section>
    </PageWrapper>
  );
};
