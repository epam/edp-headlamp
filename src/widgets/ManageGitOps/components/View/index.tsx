import { Grid } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { GIT_SERVERS } from '../../../../constants/gitServers';
import { CODEBASE_FORM_NAMES } from '../../names';
import { ManageGitOpsValues } from '../../types';
import { GitRepoPath, GitServer, Name } from '../fields';

export const View = () => {
  const { watch } = useFormContext<ManageGitOpsValues>();

  const gitServerFieldValue = watch(CODEBASE_FORM_NAMES.gitServer.name);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <GitServer />
        </Grid>
        {gitServerFieldValue !== GIT_SERVERS.GERRIT && (
          <Grid item xs={5}>
            <GitRepoPath />
          </Grid>
        )}
        <Grid item xs={3}>
          <Name />
        </Grid>
      </Grid>
    </>
  );
};
