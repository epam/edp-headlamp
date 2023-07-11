import { Icon } from '@iconify/react';
import { Button, Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { DocLink } from '../../components/DocLink';
import { URL_EDP_HEADLAMP_USER_GUIDE_CD_PIPELINES } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { useCreateCDPipeline } from '../../k8s/EDPCDPipeline/hooks/useCreateCDPipeline';
import { CreateCDPipelineForm } from './components/CreateCDPipelineForm';
import { useStyles } from './styles';
import { CreateCDPipelineProps } from './types';

export const CreateCDPipeline = ({
    createDialogOpen,
    onClose,
    setCreateDialogOpen,
}: CreateCDPipelineProps) => {
    const classes = useStyles();

    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    const {
        createCDPipeline,
        mutations: {
            CDPipelineCreateMutation,
            CDPipelineStageCreateMutation,
            CDPipelineDeleteMutation,
            CDPipelineStageDeleteMutation,
        },
    } = useCreateCDPipeline({
        onSuccess: () => {
            setCreateDialogOpen(false);
        },
        onError: () => {
            setCreateDialogOpen(true);
        },
    });

    return (
        <Dialog
            open={createDialogOpen}
            onClose={onClose}
            maxWidth={'md'}
            fullWidth
            className={classes.dialogRoot}
        >
            <div className={classes.dialog} data-testid={'create-cdpipeline'}>
                <div className={classes.dialogTitle}>
                    <Grid container alignItems={'center'} spacing={1}>
                        <Grid item>
                            <Typography variant={'h5'}>Create CD Pipeline</Typography>
                        </Grid>
                        <Grid item>
                            <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE_CD_PIPELINES} />
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
                    <CreateCDPipelineForm
                        editorOpen={editorOpen}
                        setEditorOpen={setEditorOpen}
                        handleApply={createCDPipeline}
                        setDialogOpen={setCreateDialogOpen}
                        isApplying={
                            CDPipelineCreateMutation.isLoading ||
                            CDPipelineDeleteMutation.isLoading ||
                            CDPipelineStageCreateMutation.isLoading ||
                            CDPipelineStageDeleteMutation.isLoading
                        }
                    />
                </DialogContent>
            </div>
        </Dialog>
    );
};
