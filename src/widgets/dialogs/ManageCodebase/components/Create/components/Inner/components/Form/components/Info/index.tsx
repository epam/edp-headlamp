import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { CODEBASE_TYPE } from '../../../../../../../../../../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGY } from '../../../../../../../../../../../constants/creationStrategies';
import { GIT_PROVIDER } from '../../../../../../../../../../../constants/gitProviders';
import { Resources } from '../../../../../../../../../../../icons/sprites/Resources';
import { useTypedFormContext } from '../../../../../../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../../../../../../names';
import { useCurrentDialog } from '../../../../../../../../providers/CurrentDialog/hooks';
import { isCloneStrategy } from '../../../../../../../../utils';
import {
  BuildTool,
  CiTool,
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
  const { apiServiceBase } = useCurrentDialog();

  const langFieldValue = watch(CODEBASE_FORM_NAMES.lang.name);
  const typeFieldValue = watch(CODEBASE_FORM_NAMES.type.name);
  const strategyFieldValue = watch(CODEBASE_FORM_NAMES.strategy.name);
  const hasCodebaseAuthFieldValue = watch(CODEBASE_FORM_NAMES.hasCodebaseAuth.name);
  const gitServerFieldValue = watch(CODEBASE_FORM_NAMES.gitServer.name);

  return (
    <>
      <Resources />
      <Grid container spacing={2}>
        {isCloneStrategy(strategyFieldValue) ? (
          <>
            <Grid item xs={12}>
              <RepositoryUrl />
            </Grid>
          </>
        ) : null}

        <Grid item xs={12}>
          <Stack spacing={1} direction="row" alignItems="flex-start">
            <Box sx={{ maxWidth: '25%', width: '100%' }}>
              <GitServer />
            </Box>
            {gitServerFieldValue.includes(GIT_PROVIDER.GERRIT) || !apiServiceBase.apiBaseURL ? (
              <Box sx={{ maxWidth: '75%', width: '100%' }}>
                <GitUrlPath />
              </Box>
            ) : (
              <>
                <Box sx={{ maxWidth: '30%', width: '100%' }}>
                  <Owner />
                </Box>
                <Stack spacing={1} direction="row" sx={{ maxWidth: '45%', width: '100%' }}>
                  <Typography sx={{ pt: theme.typography.pxToRem(24) }}>/</Typography>
                  <Box flexGrow={1} flexShrink={0}>
                    <Repository />
                  </Box>
                </Stack>
              </>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <CiTool />
        </Grid>

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
