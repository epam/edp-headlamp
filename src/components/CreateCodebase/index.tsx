import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { ICONS } from '../../constants/icons';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
import { CreateCodebaseForm } from './components/CreateCodebaseForm';
import { useCreateCodebase } from './hooks/useCreateCodebase';
import { useStyles } from './styles';
import { CreateCodebaseProps } from './types';

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

    const {
        createCodebase,
        mutations: {
            codebaseCreateMutation,
            codebaseSecretCreateMutation,
            codebaseSecretDeleteMutation,
        },
    } = useCreateCodebase({
        onSuccess: () => setCreateDialogOpen(false),
        onError: () => setCreateDialogOpen(true),
    });

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
                        handleApply={createCodebase}
                        setDialogOpen={setCreateDialogOpen}
                        isApplying={
                            codebaseCreateMutation.isLoading ||
                            codebaseSecretCreateMutation.isLoading ||
                            codebaseSecretDeleteMutation.isLoading
                        }
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
