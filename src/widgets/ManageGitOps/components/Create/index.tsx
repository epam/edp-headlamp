import { Icon } from '@iconify/react';
import { Box, Grid, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { GIT_PROVIDER } from '../../../../constants/gitProviders';
import { useGitServerListQuery } from '../../../../k8s/groups/EDP/GitServer/hooks/useGitServerListQuery';
import { MainRadioGroup } from '../../../../providers/Form/components/MainRadioGroup';
import { CODEBASE_FORM_NAMES } from '../../names';
import { ManageGitOpsValues } from '../../types';
import { CiTool, GitRepoPath, GitServer, Name } from '../fields';

const codebaseCreationStrategies = [
  {
    value: 'create',
    label: 'Create',
    description: 'Create a new base repository.',
    icon: (
      <Icon
        icon={'material-symbols:create-new-folder-outline-rounded'}
        width={24}
        height={24}
        color="#002446"
      />
    ),
    checkedIcon: (
      <Icon
        icon={'material-symbols:create-new-folder-outline-rounded'}
        width={24}
        height={24}
        color="#002446"
      />
    ),
  },
  {
    value: 'import',
    label: 'Import',
    description: 'Onboard your existing repository.',
    icon: <Icon icon={'carbon:document-import'} width={24} height={24} color="#002446" />,
    checkedIcon: <Icon icon={'carbon:document-import'} width={24} height={24} color="#002446" />,
  },
];
export const Create = () => {
  const { watch } = useFormContext<ManageGitOpsValues>();
  const { data: gitServers, isFetched } = useGitServerListQuery();

  const gitServerFieldValue = watch(CODEBASE_FORM_NAMES.gitServer.name);

  const gitServer = gitServers?.items.find(
    (gitServer) => gitServer.metadata.name === gitServerFieldValue
  );

  const gitServerProvider = gitServer?.spec.gitProvider;

  const theme = useTheme();

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={2}>
      <MainRadioGroup
        {...register(CODEBASE_FORM_NAMES.strategy.name)}
        control={control}
        errors={errors}
        options={codebaseCreationStrategies}
        gridItemSize={4}
      />

      <Box sx={{ p: `${theme.typography.pxToRem(24)} ${theme.typography.pxToRem(8)}` }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <GitServer />
          </Grid>
          <Grid item xs={6}>
            <CiTool />
          </Grid>
          {gitServerProvider !== GIT_PROVIDER.GERRIT && !!isFetched && (
            <Grid item xs={9}>
              <GitRepoPath />
            </Grid>
          )}
          <Grid item xs={3}>
            <Name />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};
