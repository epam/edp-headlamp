import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';

const {
    pluginLib: { MuiCore },
} = window;
const { makeStyles } = MuiCore;

export const useStyles = (codebaseSpec: EDPCodebaseKubeObjectInterface['spec']) =>
    makeStyles(theme => ({
        statusLabel: {
            fontSize: '1.1em',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingTop: theme.spacing(0.5),
            paddingBottom: theme.spacing(0.5),
            display: 'inline-block',
            textAlign: 'center',
            backgroundColor: codebaseSpec.emptyProject
                ? theme.palette.error.light
                : theme.palette.success.light,
            color: codebaseSpec.emptyProject
                ? theme.palette.error.main
                : theme.palette.success.main,
        },
    }));
