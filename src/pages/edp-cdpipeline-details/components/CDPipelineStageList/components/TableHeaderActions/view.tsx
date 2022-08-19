import { CreateKubeObject } from '../../../../../../components/CreateKubeObject';
import { createCDPipelineStageExample } from '../../../../../../configs/k8s-resource-examples/custom-resources/stage';
import { ICON_DOCUMENT_ADD } from '../../../../../../constants/icons';
import { Iconify, MuiCore, React } from '../../../../../../plugin.globals';
import { TableHeaderActionsProps } from './types';

const { Icon } = Iconify;
const { Tooltip, Button, Typography } = MuiCore;

export const TableHeaderActions: React.FC<TableHeaderActionsProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    return (
        <>
            <Tooltip title={'Create stage'}>
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
                kubeObjectExample={createCDPipelineStageExample(kubeObjectData)}
            />
        </>
    );
};
