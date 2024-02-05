import { Router } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { EmptyList } from '../../../../components/EmptyList';
import { Table } from '../../../../components/Table';
import { Resources } from '../../../../icons/sprites/Resources';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { ResourceActionListContextProvider } from '../../../../providers/ResourceActionList';
import { FORM_MODES } from '../../../../types/forms';
import { CodebaseActionsMenu } from '../../../../widgets/CodebaseActionsMenu';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../../../../widgets/CreateEditCodebase/constants';
import { routeEDPGitServerList } from '../../../edp-configuration/pages/edp-gitserver-list/route';
import { usePageFilterContext } from '../../hooks/usePageFilterContext';
import { useColumns } from './hooks/useColumns';
import { ComponentListProps } from './types';

export const ComponentList = ({ noGitServers }: ComponentListProps) => {
  const columns = useColumns();

  const gitServersConfigurationPageRoute = Router.createRouteURL(routeEDPGitServerList.path);
  const history = useHistory();

  const [items, error] = EDPCodebaseKubeObject.useList();
  const { setDialog } = useDialogContext();

  const { filterFunction } = usePageFilterContext();

  return (
    <ResourceActionListContextProvider>
      <CodebaseActionsMenu />
      <Resources />
      <Table
        isLoading={!items}
        data={items}
        error={error?.toString()}
        columns={columns}
        filterFunction={filterFunction}
        emptyListComponent={
          items !== null && noGitServers ? (
            <EmptyList
              customText={'No Git Servers Connected.'}
              linkText={'Click here to add a Git Server.'}
              handleClick={() => history.push(gitServersConfigurationPageRoute)}
            />
          ) : (
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
          )
        }
      />
    </ResourceActionListContextProvider>
  );
};
