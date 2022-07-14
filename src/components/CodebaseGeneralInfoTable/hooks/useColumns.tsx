import { Theme } from '@material-ui/core/styles/createTheme';
import { EDPCodebaseSpecInterface } from '../../../k8s/EDPCodebase/types';

const {
    pluginLib: { React, MuiCore },
} = globalThis;
const { Typography } = MuiCore;

export const useColumns = (
    codebaseSpec: EDPCodebaseSpecInterface,
    classes: { [key: string]: string },
    theme: Theme
) =>
    React.useMemo(
        () => [
            {
                name: 'Language',
                value: codebaseSpec.lang,
            },
            {
                name: 'Empty Project',
                value: (
                    <Typography className={classes.statusLabel} component="span">
                        {codebaseSpec.emptyProject ? 'Yes' : 'No'}
                    </Typography>
                ),
            },
            {
                name: 'Build tool',
                value: codebaseSpec.buildTool,
            },
            {
                name: 'Framework',
                value: codebaseSpec.framework,
            },
            {
                name: 'Strategy',
                value: codebaseSpec.strategy,
            },
            {
                name: 'Default Branch',
                value: codebaseSpec.defaultBranch,
            },
        ],
        [codebaseSpec, classes, theme]
    );
