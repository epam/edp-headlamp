import { Icon } from '@iconify/react';
import { Button, Tooltip, Typography } from '@material-ui/core';
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
                    startIcon={<Icon icon={ICONS.DOCUMENT_ADD} />}
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
                    <Typography>Create</Typography>
                </Button>
            </Tooltip>
        </>
    );
};
