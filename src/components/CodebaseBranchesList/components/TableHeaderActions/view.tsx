import { ICON_DOCUMENT_ADD } from '../../../../constants/icons';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { CreateCodebaseBranch } from '../../../CreateCodebaseBranch';
import { TableHeaderActionsProps } from './types';

const { Icon } = Iconify;
const { Tooltip, Button, Typography } = MuiCore;

export const TableHeaderActions: React.FC<TableHeaderActionsProps> = ({
    kubeObjectData,
}): React.ReactElement => {
    const [createFormOpen, setCreateFormOpen] = React.useState<boolean>(false);

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
            />
        </>
    );
};
