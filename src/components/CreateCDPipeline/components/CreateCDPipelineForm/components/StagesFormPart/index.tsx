import { MuiCore, MuiLab, React } from '../../../../../../plugin.globals';
import { Stages } from '../../../../../FormFields/CDPipelineFields/Stages';
import { Render } from '../../../../../Render';
import { StagesFormPartProps } from './types';

const { Grid } = MuiCore;
const { Alert } = MuiLab;

export const StagesFormPart = ({
    stages,
    setCreateStageDialogOpen,
    onStageDelete,
}: StagesFormPartProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stages
                    stages={stages}
                    setCreateStageDialogOpen={setCreateStageDialogOpen}
                    onStageDelete={onStageDelete}
                />
            </Grid>

            <Render condition={stages && !stages.length}>
                <Grid item xs={12}>
                    <Alert severity="info" elevation={2} variant="filled">
                        Add at least one stage
                    </Alert>
                </Grid>
            </Render>
        </Grid>
    );
};
