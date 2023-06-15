import { ICONS } from '../../constants/icons';
import { URL_EDP_HEADLAMP_USER_GUIDE_STAGE_ADD } from '../../constants/urls';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { DocLink } from '../DocLink';
import { CreateCDPipelineStageForm } from './components/CreateCDPipelineStageForm';
import { useStyles } from './styles';
import { CreateCDPipelineStageProps } from './types';

const { Dialog, DialogContent, Typography, Button, Grid } = MuiCore;
const { Icon } = Iconify;

export const CreateCDPipelineStage = ({
    CDPipelineData,
    otherStages,
    open,
    setOpen,
    onClose,
    handleApply,
    isApplying,
}: CreateCDPipelineStageProps): React.ReactElement => {
    const classes = useStyles();
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    return (
        <Dialog open={open} onClose={onClose} maxWidth={'md'} className={classes.dialogRoot}>
            <div className={classes.dialog} data-testid={'create-cdpipeline-stage'}>
                <div className={classes.dialogTitle}>
                    <Grid container alignItems={'center'} spacing={1}>
                        <Grid item>
                            <Typography
                                variant={'h5'}
                            >{`Create stage for "${CDPipelineData.metadata.name}"`}</Typography>
                        </Grid>
                        <Grid item>
                            <DocLink
                                title={'CD Pipeline Stage Creation Doc'}
                                href={URL_EDP_HEADLAMP_USER_GUIDE_STAGE_ADD}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        startIcon={<Icon icon={ICONS['PENCIL']} />}
                        size="small"
                        component={'button'}
                        onClick={() => setEditorOpen(true)}
                        style={{ flexShrink: 0 }}
                    >
                        Edit YAML
                    </Button>
                </div>
                <DialogContent className={classes.dialogContent}>
                    <CreateCDPipelineStageForm
                        CDPipelineData={CDPipelineData}
                        otherStages={otherStages}
                        editorOpen={editorOpen}
                        setEditorOpen={setEditorOpen}
                        setDialogOpen={setOpen}
                        handleApply={handleApply}
                        isApplying={isApplying}
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
