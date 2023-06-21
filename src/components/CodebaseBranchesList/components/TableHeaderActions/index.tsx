import { ICONS } from '../../../../constants/icons';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { CreateCodebaseBranch } from '../../../CreateCodebaseBranch';
import { TableHeaderActionsProps } from './types';

const { Icon } = Iconify;
const { Tooltip, Button, Typography } = MuiCore;

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
