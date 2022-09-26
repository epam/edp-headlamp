import { MuiCore, React } from '../../../../../../plugin.globals';
import ErrorBoundary from '../../../../../ErrorBoundary/view';
import { Stages } from '../../../../../FormFields/CDPipelineFields/Stages';
import { StagesFormPartProps } from './types';

const { Grid } = MuiCore;

export const StagesFormPart = ({
    stages,
    setCreateStageDialogOpen,
    onStageDelete,
}: StagesFormPartProps): React.ReactElement => {
    return (
        <ErrorBoundary>
            <Grid container spacing={1}>
                <Stages
                    stages={stages}
                    setCreateStageDialogOpen={setCreateStageDialogOpen}
                    onStageDelete={onStageDelete}
                />
            </Grid>
        </ErrorBoundary>
    );
};
