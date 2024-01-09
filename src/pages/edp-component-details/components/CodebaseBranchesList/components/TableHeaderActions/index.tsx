import { Icon } from '@iconify/react';
import { Button, Tooltip } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { CREATE_CODEBASE_BRANCH_DIALOG_NAME } from '../../../../../../widgets/CreateCodebaseBranch/constants';
import { CreateCodebaseBranchDialogForwardedProps } from '../../../../../../widgets/CreateCodebaseBranch/types';
import { TableHeaderActionsProps } from './types';

export const TableHeaderActions = ({ codebase, defaultBranch }: TableHeaderActionsProps) => {
    const { setDialog } = useDialogContext<CreateCodebaseBranchDialogForwardedProps>();

    return (
        <>
            <Tooltip title={'Create branch'}>
                <Button
                    startIcon={<Icon icon={ICONS.PLUS} />}
                    color={'primary'}
                    variant={'contained'}
                    onClick={() => {
                        setDialog({
                            modalName: CREATE_CODEBASE_BRANCH_DIALOG_NAME,
                            forwardedProps: {
                                codebase,
                                defaultBranch,
                            },
                        });
                    }}
                >
                    create
                </Button>
            </Tooltip>
        </>
    );
};
