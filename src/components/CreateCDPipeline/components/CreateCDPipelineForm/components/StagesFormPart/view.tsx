import { MuiCore, React } from '../../../../../../plugin.globals';
import ErrorBoundary from '../../../../../ErrorBoundary/view';
import { StagesFormPartProps } from './types';

const { Grid } = MuiCore;

export const StagesFormPart = ({}: StagesFormPartProps): React.ReactElement => {
    return (
        <ErrorBoundary>
            <Grid container spacing={2}></Grid>
        </ErrorBoundary>
    );
};
