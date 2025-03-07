import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { CODEBASE_TYPE } from '../../../../../../../../../../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGY } from '../../../../../../../../../../../constants/creationStrategies';
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
          <Stack direction="row" spacing={2}>
            <Box flexGrow={1} flexShrink={0}>
              <GitServer />
            </Box>
            <Typography sx={{ pt: theme.typography.pxToRem(18) }}>/</Typography>
            <Box flexGrow={1} flexShrink={0}>
              <GitUrlPath />
            </Box>
          </Stack>
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
