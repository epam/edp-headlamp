import { Grid } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { GIT_SERVERS } from '../../../../constants/gitServers';
import { useGitServerListQuery } from '../../../../k8s/groups/EDP/GitServer/hooks/useGitServerListQuery';
import { CODEBASE_FORM_NAMES } from '../../names';
import { ManageGitOpsValues } from '../../types';
import { GitRepoPath, GitServer, Name } from '../fields';

export const View = () => {
  const { watch } = useFormContext<ManageGitOpsValues>();

  const { data: gitServers, isFetched } = useGitServerListQuery({});

  const gitServerFieldValue = watch(CODEBASE_FORM_NAMES.gitServer.name);

  const gitServer = gitServers?.items.find(
    (gitServer) => gitServer.metadata.name === gitServerFieldValue
  );

  const gitServerProvider = gitServer?.spec.gitProvider;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <GitServer />
        </Grid>
        {gitServerProvider !== GIT_SERVERS.GERRIT && !!isFetched && (
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
