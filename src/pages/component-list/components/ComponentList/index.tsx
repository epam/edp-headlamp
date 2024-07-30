import { Router } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { EmptyList } from '../../../../components/EmptyList';
import { Table } from '../../../../components/Table';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { Resources } from '../../../../icons/sprites/Resources';
import { CodebaseKubeObject } from '../../../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../../../../widgets/CreateEditCodebase/constants';
import { routeGitServerList } from '../../../configuration/pages/edp-gitserver-list/route';
import { usePageFilterContext } from '../../hooks/usePageFilterContext';
import { usePermissionsContext } from '../../providers/Permissions/hooks';
import { ComponentMultiDeletion } from './components/ComponentMultiDeletion';
import { useColumns } from './hooks/useColumns';
import { useUpperColumns } from './hooks/useUpperColumns';
import { ComponentListProps } from './types';

export const ComponentList = ({ noGitServers }: ComponentListProps) => {
  const columns = useColumns();

  const gitServersConfigurationPageRoute = Router.createRouteURL(routeGitServerList.path);
  const history = useHistory();

  const [items, error] = CodebaseKubeObject.useList();
  const { setDialog } = useDialogContext();

  const { filterFunction } = usePageFilterContext();

  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelectAllClick = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, paginatedItems: CodebaseKubeObjectInterface[]) => {
      if (event.target.checked) {
        const newSelected = paginatedItems
          .map(({ metadata: { name }, spec: { type } }) =>
            type === CODEBASE_TYPES.SYSTEM ? null : name
          )
          .filter(Boolean);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    },
    []
  );

  const handleSelectRowClick = React.useCallback(
    (event: React.MouseEvent<unknown>, row: CodebaseKubeObjectInterface) => {
      const isSystemCodebase = row.spec.type === CODEBASE_TYPES.SYSTEM;

      if (isSystemCodebase) {
        return;
      }

      const name = row.metadata.name;
      const selectedIndex = selected.indexOf(name);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const { codebase: codebasePermissions } = usePermissionsContext();

  const upperColumns = useUpperColumns({
    selected,
    onUninstallClick: () => {
      setDeleteDialogOpen(true);
    },
    permissions: codebasePermissions,
  });

  const renderEmptyListComponent = React.useCallback(() => {
    const componentsAreLoaded = items !== null;

    if (!codebasePermissions.create) {
      return <EmptyList customText="You do not have permission to create components." />;
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
          setDialog({
            modalName: CREATE_EDIT_CODEBASE_DIALOG_NAME,
            forwardedProps: {
              mode: FORM_MODES.CREATE,
            },
          });
        }}
      />
    );
  }, [
    codebasePermissions.create,
    gitServersConfigurationPageRoute,
    history,
    items,
    noGitServers,
    setDialog,
  ]);

  return (
    <>
      <Resources />
      <Table<CodebaseKubeObjectInterface>
        isLoading={items === null}
        data={items}
        error={error}
        columns={columns}
        upperColumns={upperColumns}
        filterFunction={filterFunction}
        handleSelectRowClick={handleSelectRowClick}
        handleSelectAllClick={handleSelectAllClick}
        selected={selected}
        isSelected={(row) => selected.indexOf(row.metadata.name) !== -1}
        canBeSelected={(row) => row.spec.type !== CODEBASE_TYPES.SYSTEM}
        emptyListComponent={renderEmptyListComponent()}
      />
      {deleteDialogOpen && (
        <ComponentMultiDeletion
          open={deleteDialogOpen}
          handleClose={() => setDeleteDialogOpen(false)}
          onDelete={() => {
            setDeleteDialogOpen(false);
            setSelected([]);
          }}
          components={items}
          selected={selected}
        />
      )}
    </>
  );
};
