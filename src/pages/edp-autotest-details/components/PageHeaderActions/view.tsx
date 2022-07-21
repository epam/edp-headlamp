import { EditKubeObject } from '../../../../components/EditKubeObject';
import { ICON_PENCIL } from '../../../../constants/icons';
import { Iconify, MuiCore, React } from '../../../../plugin.globals';
import { PageHeaderActionsProps } from './types';

const { Icon } = Iconify;
const { Tooltip, IconButton } = MuiCore;

export const PageHeaderActions: React.FC<PageHeaderActionsProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    return (
        <>
            <Tooltip title="Edit Autotest">
                <IconButton aria-label="Edit Autotest" onClick={() => setEditorOpen(true)}>
                    <Icon icon={ICON_PENCIL} />
                </IconButton>
            </Tooltip>
            <EditKubeObject
                editorOpen={editorOpen}
                setEditorOpen={setEditorOpen}
                kubeObject={kubeObject}
                kubeObjectData={kubeObjectData.jsonData}
            />
        </>
    );
};
