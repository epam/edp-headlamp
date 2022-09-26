import { ICON_PENCIL } from '../../constants/icons';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { CreateCodebaseBranchForm } from './components/CreateCodebaseBranchForm';
import { useStyles } from './styles';
import { CreateCodebaseBranchProps } from './types';

const { Dialog, DialogContent, Typography, Button } = MuiCore;
const { Icon } = Iconify;

export const CreateCodebaseBranch = ({
    codebaseData,
    open,
    setOpen,
    onClose,
    handleApply,
    isApplying,
}: CreateCodebaseBranchProps): React.ReactElement => {
    const classes = useStyles();
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <div className={classes.dialog} data-testid={'create-codebase-branch'}>
                <div className={classes.dialogTitle}>
                    <Typography variant={'h5'}>{`Create new branch`}</Typography>
                    <Button
                        startIcon={<Icon icon={ICON_PENCIL} />}
                        size="small"
                        component={'button'}
                        onClick={() => setEditorOpen(true)}
                    >
                        Edit YAML
                    </Button>
                </div>
                <DialogContent className={classes.dialogContent}>
                    <CreateCodebaseBranchForm
                        codebaseData={codebaseData}
                        editorOpen={editorOpen}
                        setEditorOpen={setEditorOpen}
                        handleApply={handleApply}
                        setDialogOpen={setOpen}
                        isApplying={isApplying}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
