import { MuiCore, React } from '../../../../../../plugin.globals';
import { Applications } from '../../../../../FormFields/CDPipelineFields';
import { ApplicationsFormPartProps } from './types';

const { Grid } = MuiCore;

export const ApplicationsFormPart = ({
    names,
    handleFormFieldChange,
}: ApplicationsFormPartProps) => {
    return (
        <Grid container spacing={3}>
            <Applications names={names} handleFormFieldChange={handleFormFieldChange} />
        </Grid>
    );
};
