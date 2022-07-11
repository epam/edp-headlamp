import { EditKubeObject } from '../../../../../../components/EditKubeObject';
import { KubeObjectActions } from '../../../../../../components/KubeObjectActions';
import { KubeObjectAction } from '../../../../../../components/KubeObjectActions/types';
import { RowActionsProps } from './types';

const {
    pluginLib: { React, MuiCore, Iconify },
} = globalThis;

const { IconButton } = MuiCore;
const { Icon } = Iconify;

export const RowActions: React.FC<RowActionsProps> = ({
    kubeObject,
    kubeObjectData,
}): React.ReactElement => {
    const [tooltipOpen, setTooltipOpen] = React.useState<boolean>(false);
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    const handleTooltipToggle = React.useCallback(() => {
        setTooltipOpen(prev => !prev);
    }, [setTooltipOpen]);

    const actions: KubeObjectAction[] = [
        {
            name: 'edit',
            label: 'Edit',
            action: e => {
                e.stopPropagation();
                setTooltipOpen(false);
                setEditorOpen(true);
            },
        },
        {
            name: 'delete',
            label: 'Delete',
            disabled: true,
            action: e => {
                e.stopPropagation();
                setTooltipOpen(false);
            },
        },
    ];

    return (
        <KubeObjectActions
            tooltipOpen={tooltipOpen}
            setTooltipOpen={setTooltipOpen}
            actions={actions}
        >
            <div>
                <IconButton aria-label={'Options'} onClick={handleTooltipToggle}>
                    <Icon icon={'mi:options-vertical'} color={'grey'} width="20" />
                </IconButton>
                <EditKubeObject
                    editorOpen={editorOpen}
                    setEditorOpen={setEditorOpen}
                    kubeObject={kubeObject}
                    kubeObjectData={kubeObjectData}
                />
            </div>
        </KubeObjectActions>
    );
};
