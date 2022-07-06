import { CreateKubeObject } from '../../../../../../components/CreateKubeObject';
import { createCDPipelineStageExample } from '../../../../../../configs/kube-examples/edp-cdpipeline-stage';
import { TableHeaderActionsProps } from './types';

const {
    pluginLib: { React, MuiCore, Iconify },
} = globalThis;
const { Tooltip, Button, Typography } = MuiCore;
const { Icon } = Iconify;

export const TableHeaderActions: React.FC<TableHeaderActionsProps> = ({
    kubeObject,
    cdPipelineName,
}): React.ReactElement => {
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    return (
        <>
            <Tooltip title={'Create stage'}>
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
                kubeObjectExample={createCDPipelineStageExample(cdPipelineName)}
            />
        </>
    );
};
