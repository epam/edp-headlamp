import { ICON_DOCUMENT_ADD } from '../../../../constants/icons';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { Iconify, MuiCore, React, ReactRedux } from '../../../../plugin.globals';
import { clusterAction } from '../../../../redux/actions';
import { CreateCodebaseBranch } from '../../../CreateCodebaseBranch';
import { useCreateCodebaseBranch } from '../../../CreateCodebaseBranch/hooks/useCreateCodebaseBranch';
import { TableHeaderActionsProps } from './types';

const { Icon } = Iconify;
const { Tooltip, Button, Typography } = MuiCore;
const { useDispatch } = ReactRedux;

export const TableHeaderActions: React.FC<TableHeaderActionsProps> = ({
    kubeObjectData,
}): React.ReactElement => {
    const [createFormOpen, setCreateFormOpen] = React.useState<boolean>(false);
    const dispatch = useDispatch();

    const { createCodebaseBranch } = useCreateCodebaseBranch(
        () => setCreateFormOpen(false),
        () => setCreateFormOpen(true)
    );

    const applyFunc = React.useCallback(
        async (
            newCodebaseBranchData: EDPCodebaseBranchKubeObjectInterface
        ): Promise<EDPCodebaseBranchKubeObjectInterface | undefined> =>
            createCodebaseBranch(newCodebaseBranchData),
        [createCodebaseBranch]
    );
    const handleApply = React.useCallback(
        async (newCodebaseBranchData: EDPCodebaseBranchKubeObjectInterface): Promise<void> => {
            const cancelUrl = location.pathname;
            const {
                spec: { branchName },
            } = newCodebaseBranchData;

            dispatch(
                clusterAction(() => applyFunc(newCodebaseBranchData), {
                    startMessage: `Applying ${branchName}`,
                    cancelledMessage: `Cancelled applying ${branchName}`,
                    successMessage: `Applied ${branchName}`,
                    errorMessage: `Failed to apply ${branchName}`,
                    cancelUrl,
                })
            );
        },
        [applyFunc, dispatch]
    );

    return (
        <>
            <Tooltip title={'Create branch'}>
                <Button
                    startIcon={<Icon icon={ICON_DOCUMENT_ADD} />}
                    onClick={() => setCreateFormOpen(true)}
                >
                    <Typography>Create</Typography>
                </Button>
            </Tooltip>
            <CreateCodebaseBranch
                codebaseData={kubeObjectData}
                open={createFormOpen}
                onClose={() => setCreateFormOpen(false)}
                setOpen={setCreateFormOpen}
                handleApply={handleApply}
            />
        </>
    );
};
