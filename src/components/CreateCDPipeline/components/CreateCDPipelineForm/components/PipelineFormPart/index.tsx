import { MuiCore, React } from '../../../../../../plugin.globals';
import ErrorBoundary from '../../../../../ErrorBoundary';
import { DeploymentType, PipelineName } from '../../../../../FormFields/CDPipelineFields';
import { PipelineInfoFormPartProps } from './types';

const { Grid } = MuiCore;

export const PipelineInfoFormPart = ({
    names,
    handleFormFieldChange,
    onPipelineNameChange,
}: PipelineInfoFormPartProps): React.ReactElement => {
    return (
        <ErrorBoundary>
            <Grid container spacing={2}>
                <PipelineName
                    names={names}
                    handleFormFieldChange={handleFormFieldChange}
                    onPipelineNameChange={onPipelineNameChange}
                />
                <DeploymentType names={names} handleFormFieldChange={handleFormFieldChange} />
            </Grid>
        </ErrorBoundary>
    );
};
