import { ICONS } from '../../../../constants/icons';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { CreateCodebaseBranch } from '../../../CreateCodebaseBranch';
import { useCreateCodebaseBranch } from '../../../CreateCodebaseBranch/hooks/useCreateCodebaseBranch';
import { TableHeaderActionsProps } from './types';

const { Icon } = Iconify;
const { Tooltip, Button, Typography } = MuiCore;

export const TableHeaderActions = ({
    kubeObjectData,
}: TableHeaderActionsProps): React.ReactElement => {
    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

    const {
        createCodebaseBranch,
        mutations: { codebaseBranchCreateMutation, codebaseBranchEditMutation },
    } = useCreateCodebaseBranch({
        onSuccess: () => {
            setCreateDialogOpen(false);
        },
        onError: () => {
            setCreateDialogOpen(true);
        },
    });

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
                onClose={() => setCreateDialogOpen(false)}
                setOpen={setCreateDialogOpen}
                handleApply={createCodebaseBranch}
                isApplying={
                    codebaseBranchCreateMutation.isLoading || codebaseBranchEditMutation.isLoading
                }
            />
        </>
    );
};
