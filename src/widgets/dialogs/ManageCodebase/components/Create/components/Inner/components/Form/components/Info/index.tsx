import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { CODEBASE_TYPE } from '../../../../../../../../../../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGY } from '../../../../../../../../../../../constants/creationStrategies';
import { GIT_PROVIDER } from '../../../../../../../../../../../constants/gitProviders';
import { Resources } from '../../../../../../../../../../../icons/sprites/Resources';
import { useTypedFormContext } from '../../../../../../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../../../../../../names';
import { isCloneStrategy } from '../../../../../../../../utils';
import {
  BuildTool,
  CodebaseAuth,
  Description,
  EmptyProject,
  Framework,
  GitServer,
  GitUrlPath,
  Lang,
  Name,
  Owner,
  Private,
  Repository,
  RepositoryLogin,
  RepositoryPasswordOrApiToken,
  RepositoryUrl,
  TestReportFramework,
} from '../../../../../../../fields';

export const Info = () => {
  const theme = useTheme();
  const { watch } = useTypedFormContext();

  const langFieldValue = watch(CODEBASE_FORM_NAMES.lang.name);
  const typeFieldValue = watch(CODEBASE_FORM_NAMES.type.name);
  const strategyFieldValue = watch(CODEBASE_FORM_NAMES.strategy.name);
  const hasCodebaseAuthFieldValue = watch(CODEBASE_FORM_NAMES.hasCodebaseAuth.name);
  const gitServerFieldValue = watch(CODEBASE_FORM_NAMES.gitServer.name);

  return (
    <>
      <Resources />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <GitServer />
        </Grid>
        {isCloneStrategy(strategyFieldValue) ? (
          <>
            <Grid item xs={12}>
              <RepositoryUrl />
            </Grid>
          </>
        ) : null}
        {gitServerFieldValue.includes(GIT_PROVIDER.GERRIT) ? (
          <Grid item xs={12}>
            <GitUrlPath />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Stack spacing={1} direction="row" alignItems="flex-start">
              <Box sx={{ flex: '1 0 50%' }}>
                <Owner />
              </Box>
              <Stack spacing={1} direction="row" sx={{ flex: '1 0 50%' }}>
                <Typography sx={{ pt: theme.typography.pxToRem(24) }}>/</Typography>
                <Box flexGrow={1} flexShrink={0}>
                  <Repository />
                </Box>
              </Stack>
            </Stack>
          </Grid>
        )}

        {isCloneStrategy(strategyFieldValue) ? (
          <>
            <Grid item xs={12}>
              <CodebaseAuth />
            </Grid>
            {hasCodebaseAuthFieldValue ? (
              <>
                <Grid item xs={12}>
                  <RepositoryLogin />
                </Grid>
                <Grid item xs={12}>
                  <RepositoryPasswordOrApiToken />
                </Grid>
              </>
            ) : null}
          </>
        ) : null}
        <Grid item xs={12}>
          <Name />
        </Grid>
        <Grid item xs={12}>
          <Description />
        </Grid>
        {(strategyFieldValue === CODEBASE_CREATION_STRATEGY.CREATE ||
          strategyFieldValue === CODEBASE_CREATION_STRATEGY.CLONE) && (
          <Grid item xs={12}>
            <Private />
          </Grid>
        )}
        {strategyFieldValue === CODEBASE_CREATION_STRATEGY.CREATE && (
          <Grid item xs={12}>
            <EmptyProject />
          </Grid>
        )}
        <Grid item xs={12}>
          <Lang />
        </Grid>
        {langFieldValue && (
          <Grid item xs={12}>
            <Framework />
          </Grid>
        )}
        {langFieldValue && (
          <Grid item xs={12}>
            <BuildTool />
          </Grid>
        )}
        {typeFieldValue === CODEBASE_TYPE.AUTOTEST && (
          <Grid item xs={12}>
            <TestReportFramework />
          </Grid>
        )}
      </Grid>
    </>
  );
};
