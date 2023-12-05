import { Router, Utils } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { EmptyList } from '../../../../components/EmptyList';
import { Table } from '../../../../components/Table';
import { Resources } from '../../../../icons/sprites/Resources';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../../../../widgets/CreateEditCodebase/constants';
import { routeEDPGitServerList } from '../../../edp-configuration/pages/edp-gitserver-list/route';
import { useColumns } from './hooks/useColumns';
import { ComponentListProps } from './types';

export const ComponentList = ({ items, error, noGitServers }: ComponentListProps) => {
    const columns = useColumns();
    const filterFunc = Utils.useFilterFunc();

    const { setDialog } = useDialogContext();
    const gitServersConfigurationPageRoute = Router.createRouteURL(routeEDPGitServerList.path);
    const history = useHistory();

    return (
        <>
            <Resources />
            <Table
                isLoading={!items}
                data={items}
                error={error?.toString()}
                columns={columns}
                filterFunction={filterFunc}
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
                            linkText={
                                'Click here to add a new application and integrate with the platform.'
                            }
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
        </>
    );
};
