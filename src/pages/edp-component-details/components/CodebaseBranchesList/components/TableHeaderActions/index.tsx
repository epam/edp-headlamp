import { Icon } from '@iconify/react';
import { Button, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { CreateCodebaseBranch } from '../../../../../../widgets/CreateCodebaseBranch';
import { TableHeaderActionsProps } from './types';

export const TableHeaderActions = ({ kubeObjectData }: TableHeaderActionsProps) => {
    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);
    const handleCloseDialog = React.useCallback(() => setCreateDialogOpen(false), []);
    const handleOpenDialog = React.useCallback(() => setCreateDialogOpen(true), []);

    return (
        <>
            <Tooltip title={'Create branch'}>
                <Button
                    startIcon={<Icon icon={ICONS['DOCUMENT_ADD']} />}
                    onClick={() => setCreateDialogOpen(true)}
                >
                    <Typography>Create</Typography>
                </Button>
            </Tooltip>
            <CreateCodebaseBranch
                codebaseData={kubeObjectData}
                open={createDialogOpen}
                handleCloseDialog={handleCloseDialog}
                handleOpenDialog={handleOpenDialog}
            />
        </>
    );
};
