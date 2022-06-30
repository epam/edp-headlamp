import { EditKubeObject } from '../../../../components/EditKubeObject';
import { PageHeaderActionsProps } from './types';

const {
    pluginLib: { React, MuiCore, Iconify },
} = globalThis;
const { Tooltip, IconButton } = MuiCore;
const { Icon } = Iconify;

export const PageHeaderActions: React.FC<PageHeaderActionsProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    const [editorOpen, setEditorOpen] = React.useState(false);

    return (
        <>
            <Tooltip title="Edit Library">
                <IconButton aria-label="Edit Library" onClick={() => setEditorOpen(true)}>
                    <Icon icon="ci:edit" />
                </IconButton>
            </Tooltip>
            <EditKubeObject
                editorOpen={editorOpen}
                setEditorOpen={setEditorOpen}
                kubeObject={kubeObject}
                kubeObjectData={kubeObjectData}
            />
        </>
    );
};
