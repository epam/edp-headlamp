import { useNamespaces } from '../../../../../../hooks/useNamespaces';
import { MuiCore, React } from '../../../../../../plugin.globals';
import ErrorBoundary from '../../../../../ErrorBoundary/view';
import {
    DeploymentType,
    Namespace,
    PipelineName,
} from '../../../../../FormFields/CDPipelineFields';
import { PipelineInfoFormPartProps } from './types';

const { Grid } = MuiCore;

export const PipelineInfoFormPart = ({
    names,
    handleFormFieldChange,
    onPipelineNameChange,
}: PipelineInfoFormPartProps): React.ReactElement => {
    const { namespaces } = useNamespaces();

    return (
        <ErrorBoundary>
            <Grid container spacing={2}>
                <Namespace
                    names={names}
                    handleFormFieldChange={handleFormFieldChange}
                    namespaces={namespaces}
                />
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
