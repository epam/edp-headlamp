import { Utils } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { Table } from '../../../../components/Table';
import { Resources } from '../../../../icons/sprites/Resources';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../../../../widgets/CreateEditCodebase/constants';
import { useColumns } from './hooks/useColumns';
import { ComponentListProps } from './types';

export const ComponentList = ({ components, error }: ComponentListProps) => {
    const columns = useColumns();
    const filterFunc = Utils.useFilterFunc();

    const { setDialog } = useDialogContext();

    return (
        <>
            <Resources />
            <Table
                isLoading={!components}
                data={[]}
                error={error?.toString()}
                columns={columns}
                filterFunction={filterFunc}
                emptyListComponent={
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
                }
            />
        </>
    );
};
