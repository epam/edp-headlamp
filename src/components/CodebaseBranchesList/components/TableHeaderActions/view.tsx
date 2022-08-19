import { createCodebaseBranchExample } from '../../../../configs/k8s-resource-examples/custom-resources/codebase-branch';
import { ICON_DOCUMENT_ADD } from '../../../../constants/icons';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { CreateKubeObject } from '../../../CreateKubeObject';
import { TableHeaderActionsProps } from './types';

const { Icon } = Iconify;
const { Tooltip, Button, Typography } = MuiCore;

export const TableHeaderActions: React.FC<TableHeaderActionsProps> = ({
    kubeObject,
    kubeObjectData,
    onCreate,
}): React.ReactElement => {
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    return (
        <>
            <Tooltip title={'Create branch'}>
                <Button
                    startIcon={<Icon icon={ICON_DOCUMENT_ADD} />}
                    onClick={() => setEditorOpen(true)}
                >
                    <Typography>Create</Typography>
                </Button>
            </Tooltip>
            <CreateKubeObject
                editorOpen={editorOpen}
                setEditorOpen={setEditorOpen}
                kubeObject={kubeObject}
                kubeObjectExample={createCodebaseBranchExample(kubeObjectData)}
                onCreate={onCreate}
            />
        </>
    );
};
