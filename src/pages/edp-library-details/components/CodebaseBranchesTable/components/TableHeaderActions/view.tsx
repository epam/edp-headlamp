import { CreateKubeObject } from '../../../../../../components/CreateKubeObject';
import { createCodebaseBranchExample } from '../../../../../../configs/kube-examples/edp-codebase-branch';
import { TableHeaderActionsProps } from './types';

const {
    pluginLib: { React, MuiCore, Iconify },
} = globalThis;
const { Tooltip, Button, Typography } = MuiCore;
const { Icon } = Iconify;

export const TableHeaderActions: React.FC<TableHeaderActionsProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    return (
        <>
            <Tooltip title={'Create branch'}>
                <Button
                    startIcon={<Icon icon={'carbon:document-add'} />}
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
            />
        </>
    );
};
