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

export const TableHeaderActions = ({
    kubeObjectData,
}: TableHeaderActionsProps): React.ReactElement => {
    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);
    const dispatch = useDispatch();

    const [isApplying, setIsApplying] = React.useState<boolean>(false);

    const { createCodebaseBranch } = useCreateCodebaseBranch(
        () => {
            setCreateDialogOpen(false);
            setIsApplying(false);
        },
        () => {
            setCreateDialogOpen(true);
            setIsApplying(false);
        }
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
            const {
                spec: { branchName },
            } = newCodebaseBranchData;
            const cancelUrl = location.pathname;

            setIsApplying(true);

            dispatch(
                clusterAction(() => applyFunc(newCodebaseBranchData), {
                    startMessage: `Applying ${branchName}`,
                    cancelledMessage: `Cancelled applying ${branchName}`,
                    successMessage: `Applied ${branchName}`,
                    errorMessage: `Failed to apply ${branchName}`,
                    cancelUrl,
                })
            );

            // temporary solution, since we cannot pass any callbacks for action cancelling
            setTimeout(() => setIsApplying(false), 3000);
        },
        [applyFunc, dispatch]
    );

    return (
        <>
            <Tooltip title={'Create branch'}>
                <Button
                    startIcon={<Icon icon={ICON_DOCUMENT_ADD} />}
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
                handleApply={handleApply}
                isApplying={isApplying}
            />
        </>
    );
};
