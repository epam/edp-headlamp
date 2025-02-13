import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonWithPermission } from '../../../../components/ButtonWithPermission';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { EmptyList } from '../../../../components/EmptyList';
import { Table } from '../../../../components/Table';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { TABLES } from '../../../../constants/tables';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { Resources } from '../../../../icons/sprites/Resources';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { Filter } from '../../../../providers/Filter/components/Filter';
import { ManageCodebaseDialog } from '../../../../widgets/dialogs/ManageCodebase';
import { routeGitServerList } from '../../../configuration/pages/gitservers/route';
import { useTypedPermissions } from '../../hooks/useTypedPermissions';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { ComponentListFilterAllControlNames } from '../../types';
import { ComponentMultiDeletion } from './components/ComponentMultiDeletion';
import { useColumns } from './hooks/useColumns';
import { useFilter } from './hooks/useFilter';
import { useSelection } from './hooks/useSelection';

export const ComponentList = () => {
  const columns = useColumns();
  const { codebases, gitServers } = useDynamicDataContext();
  const noGitServers = gitServers.data === null || !gitServers.data?.length;

  const gitServersConfigurationPageRoute = Router.createRouteURL(routeGitServerList.path);
  const history = useHistory();

  const { setDialog } = useDialogContext();

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const permissions = useTypedPermissions();

  const emptyListComponent = React.useMemo(() => {
    const componentsAreLoaded = codebases.data !== null;

    if (!permissions?.create?.Codebase.allowed) {
      return <EmptyList customText={permissions?.create?.Codebase.reason} />;
    }

    if (componentsAreLoaded && noGitServers) {
      return (
        <EmptyList
          customText={'No Git Servers Connected.'}
          linkText={'Click here to add a Git Server.'}
          handleClick={() => history.push(gitServersConfigurationPageRoute)}
        />
      );
    }

    return (
      <EmptyList
        customText={"Let's kickstart the application onboarding!"}
        linkText={'Click here to add a new application and integrate with the platform.'}
        handleClick={() => {
          setDialog(ManageCodebaseDialog, { codebaseData: null, gitServers: gitServers.data });
        }}
      />
    );
  }, [
    codebases.data,
    gitServers.data,
    gitServersConfigurationPageRoute,
    history,
    noGitServers,
    permissions?.create?.Codebase.allowed,
    permissions?.create?.Codebase.reason,
    setDialog,
  ]);

  const { selected, setSelected, handleSelectAllClick, handleSelectRowClick } = useSelection();
  const { controls, filterFunction } = useFilter();

  return (
    <>
      <Resources />
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <ButtonWithPermission
          ButtonProps={{
            size: 'medium',
            startIcon: <Icon icon={ICONS.PLUS} />,
            color: 'primary',
            variant: 'contained',
            disabled: noGitServers,
            onClick: () =>
              setDialog(ManageCodebaseDialog, { codebaseData: null, gitServers: gitServers.data }),
          }}
          disabled={!permissions?.create?.Codebase.allowed}
          reason={permissions?.create?.Codebase.reason}
        >
          create component
        </ButtonWithPermission>
      </Stack>
      <Table<CodebaseKubeObjectInterface>
        id={TABLES.COMPONENT_LIST.id}
        name={TABLES.COMPONENT_LIST.name}
        data={codebases.data}
        isLoading={codebases.isLoading && (!codebases.errors || !codebases.errors.length)}
        errors={codebases.errors}
        columns={columns}
        selection={{
          selected,
          handleSelectAll: handleSelectAllClick,
          handleSelectRow: handleSelectRowClick,
          isRowSelected: (row) => selected.indexOf(row.metadata.name) !== -1,
          isRowSelectable: (row) => row.spec.type !== CODEBASE_TYPES.SYSTEM,
          renderSelectionInfo: (selectionLength) => (
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box
                sx={{
                  visibility: !!selectionLength ? 'visible' : 'hidden',
                  pointerEvents: !!selectionLength ? 'auto' : 'none',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ minWidth: (t) => t.typography.pxToRem(150) }}>
                    <Typography variant="body1">{selectionLength} item(s) selected</Typography>
                  </Box>
                  <ConditionalWrapper
                    condition={permissions?.delete?.Codebase.allowed}
                    wrapper={(children) => (
                      <Tooltip title={'Delete selected components'}>
                        <div>{children}</div>
                      </Tooltip>
                    )}
                  >
                    <Box sx={{ color: (t) => t.palette.secondary.dark }}>
                      <ButtonWithPermission
                        ButtonProps={{
                          size: 'small',
                          disabled: !selectionLength,
                          onClick: () => {
                            setDeleteDialogOpen(true);
                          },
                          startIcon: <Icon icon={ICONS.BUCKET} />,
                          variant: 'outlined',
                          color: 'inherit',
                        }}
                        disabled={!permissions?.delete?.Codebase.allowed}
                        reason={permissions?.delete?.Codebase.reason}
                      >
                        delete
                      </ButtonWithPermission>
                    </Box>
                  </ConditionalWrapper>
                </Stack>
              </Box>
            </Stack>
          ),
        }}
        filterFunction={filterFunction}
        emptyListComponent={emptyListComponent}
        slots={{
          header: <Filter<ComponentListFilterAllControlNames> controls={controls} />,
        }}
      />
      {deleteDialogOpen && (
        <ComponentMultiDeletion
          open={deleteDialogOpen}
          handleClose={() => setDeleteDialogOpen(false)}
          onDelete={() => {
            setDeleteDialogOpen(false);
            setSelected([]);
          }}
          components={codebases.data}
          selected={selected}
        />
      )}
    </>
  );
};
