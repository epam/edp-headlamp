import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { ICONS } from '../../constants/icons';
import { useRequest } from '../../hooks/useRequest';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { EDPKubeObjectInterface } from '../../types/k8s';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
import { CreateCodebaseForm } from './components/CreateCodebaseForm';
import { useCreateCodebase } from './hooks/useCreateCodebase';
import { useStyles } from './styles';
import { CodebaseAuthData, CreateCodebaseProps } from './types';

const { Dialog, DialogContent, Typography, Button } = MuiCore;
const { Icon } = Iconify;

export const CreateCodebase = ({
    createDialogOpen,
    onClose,
    setCreateDialogOpen,
}: CreateCodebaseProps): React.ReactElement => {
    const classes = useStyles();
    const [type, setType] = React.useState<CODEBASE_TYPES>(CODEBASE_TYPES['APPLICATION']);
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    const { createCodebase } = useCreateCodebase(
        () => {
            setCreateDialogOpen(false);
        },
        () => {
            setCreateDialogOpen(true);
        }
    );

    const applyFunc = React.useCallback(
        async (
            newCodebaseData: EDPKubeObjectInterface,
            codebaseAuthData: CodebaseAuthData | null
        ): Promise<EDPCodebaseKubeObjectInterface | undefined> =>
            createCodebase(newCodebaseData, codebaseAuthData),
        [createCodebase]
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
            newCodebaseData: EDPKubeObjectInterface,
            codebaseAuthData: CodebaseAuthData | null
        ): Promise<void> => {
            await fireRequest({
                objectName: newCodebaseData.metadata.name,
                args: [newCodebaseData, codebaseAuthData],
            });
        },
        [fireRequest]
    );

    return (
        <Dialog
            open={createDialogOpen}
            onClose={onClose}
            maxWidth={'md'}
            fullWidth
            className={classes.dialogRoot}
        >
            <div className={classes.dialog} data-testid={'create-codebase'}>
                <div className={classes.dialogTitle}>
                    <Typography variant={'h5'}>{`Create ${capitalizeFirstLetter(
                        type
                    )}`}</Typography>
                    <Button
                        startIcon={<Icon icon={ICONS['PENCIL']} />}
                        size="small"
                        component={'button'}
                        onClick={() => setEditorOpen(true)}
                    >
                        Edit YAML
                    </Button>
                </div>
                <DialogContent className={classes.dialogContent}>
                    <CreateCodebaseForm
                        setType={setType}
                        editorOpen={editorOpen}
                        setEditorOpen={setEditorOpen}
                        handleApply={handleApply}
                        setDialogOpen={setCreateDialogOpen}
                        isApplying={isLoading}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
