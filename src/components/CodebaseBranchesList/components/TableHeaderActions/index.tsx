import { ICONS } from '../../../../constants/icons';
import { useRequest } from '../../../../hooks/useRequest';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { DeepPartial } from '../../../../types/global';
import { CreateCodebaseBranch } from '../../../CreateCodebaseBranch';
import { useCreateCodebaseBranch } from '../../../CreateCodebaseBranch/hooks/useCreateCodebaseBranch';
import { TableHeaderActionsProps } from './types';

const { Icon } = Iconify;
const { Tooltip, Button, Typography } = MuiCore;

export const TableHeaderActions = ({
    kubeObjectData,
}: TableHeaderActionsProps): React.ReactElement => {
    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

    const { createCodebaseBranch } = useCreateCodebaseBranch(
        () => {
            setCreateDialogOpen(false);
        },
        () => {
            setCreateDialogOpen(true);
        }
    );

    const applyFunc = React.useCallback(
        async (
            newCodebaseBranchData: EDPCodebaseBranchKubeObjectInterface,
            newDefaultCodebaseBranchData?: DeepPartial<EDPCodebaseBranchKubeObjectInterface>
        ): Promise<EDPCodebaseBranchKubeObjectInterface | undefined> =>
            createCodebaseBranch(newCodebaseBranchData, newDefaultCodebaseBranchData),
        [createCodebaseBranch]
    );

    const {
        state: { isLoading },
        fireRequest,
    } = useRequest({
        requestFn: applyFunc,
        options: {
            mode: 'create',
        },
    });

    const handleApply = React.useCallback(
        async (
            newCodebaseBranchData: EDPCodebaseBranchKubeObjectInterface,
            newDefaultCodebaseBranchData?: DeepPartial<EDPCodebaseBranchKubeObjectInterface>
        ): Promise<void> => {
            await fireRequest({
                objectName: newCodebaseBranchData.spec.branchName,
                args: [newCodebaseBranchData, newDefaultCodebaseBranchData],
            });
        },
        [fireRequest]
    );

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
                handleApply={handleApply}
                isApplying={isLoading}
            />
        </>
    );
};
