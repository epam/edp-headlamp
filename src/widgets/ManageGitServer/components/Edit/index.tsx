import { Grid } from '@material-ui/core';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';

export const Edit = () => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Form />
            </Grid>
            <Grid item xs={12}>
                <FormActions />
            </Grid>
        </Grid>
    );
};
