import { EditKubeObject } from '../../../../../../components/EditKubeObject';
import { TableHeaderActionsProps } from './types';

const {
    pluginLib: { React, MuiCore, Iconify },
} = window;
const { Tooltip, IconButton } = MuiCore;
const { Icon } = Iconify;

export const TableHeaderActions: React.FC<TableHeaderActionsProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    const [editorOpen, setEditorOpen] = React.useState(false);

    return (
        <>
            <Tooltip title="Edit Application">
                <IconButton aria-label="Edit Application" onClick={() => setEditorOpen(true)}>
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
