import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Link as MuiLink, Stack, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { PageWrapper } from '../../../components/PageWrapper';
import { pageDescription as pipelineListPageDescription } from '../pages/pipeline-list/constants';
import { pageDescription as pipelineRunHistoryListPageDescription } from '../pages/pipeline-run-history-list/constants';
import { pageDescription as pipelineRunListPageDescription } from '../pages/pipeline-run-list/constants';
import { pageDescription as taskListPageDescription } from '../pages/task-list/constants';

const pages = [
  pipelineRunListPageDescription,
  pipelineListPageDescription,
  taskListPageDescription,
  pipelineRunHistoryListPageDescription,
];

export const PipelinesPageWrapper = ({ children }: React.PropsWithChildren<{}>) => {
  const [activeTabId, setActiveTabId] = React.useState<string>(() => {
    const activeItem = pages.find((el) => location.pathname.includes(el.routePath))!;
    return activeItem.id;
  });

  const activePage = pages.find((el) => el.id === activeTabId)!;

  const handleChangeTab = React.useCallback(
    (event: React.ChangeEvent<{}>, newActiveTabId: string) => {
      setActiveTabId(newActiveTabId);
    },
    []
  );

  return (
    <PageWrapper>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography color="primary.dark" fontSize={(t) => t.typography.pxToRem(48)}>
            {activePage.label}
          </Typography>
          <Typography variant={'body1'}>
            {activePage.description}{' '}
            <MuiLink href={activePage.docLink} target="_blank">
              Learn more.
            </MuiLink>
          </Typography>
        </Stack>
        <div>
          <Tabs
            value={activeTabId}
            onChange={handleChangeTab}
            indicatorColor={'primary'}
            textColor={'primary'}
            variant="scrollable"
            orientation="horizontal"
            scrollButtons="auto"
          >
            {pages.map((el) => {
              return (
                <Tab
                  component={Link}
                  routeName={el.routePath}
                  label={el.label}
                  value={el.id}
                  sx={{
                    minHeight: 'auto',
                    flexDirection: 'row',
                    gap: (t) => t.typography.pxToRem(10),
                    padding: (t) => t.typography.pxToRem(16),
                    textDecoration: 'none !important',
                    '& .MuiTab-iconWrapper': { m: '0 !important' },
                  }}
                />
              );
            })}
          </Tabs>
        </div>
        <div>{children}</div>
      </Stack>
    </PageWrapper>
  );
};
