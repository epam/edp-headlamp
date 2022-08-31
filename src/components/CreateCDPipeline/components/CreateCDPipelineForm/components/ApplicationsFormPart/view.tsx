import { MuiCore, React } from '../../../../../../plugin.globals';
import ErrorBoundary from '../../../../../ErrorBoundary/view';
import { Applications } from '../fields';
import { ApplicationsFormPartProps } from './types';

const { Grid } = MuiCore;

export const ApplicationsFormPart = ({
    names,
    handleFormFieldChange,
}: ApplicationsFormPartProps): React.ReactElement => {
    return (
        <ErrorBoundary>
            <Grid container spacing={2}>
                <Applications names={names} handleFormFieldChange={handleFormFieldChange} />
            </Grid>
        </ErrorBoundary>
    );
};
