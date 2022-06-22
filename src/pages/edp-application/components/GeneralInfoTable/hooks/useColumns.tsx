import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';

const {
    pluginLib: { React, MuiCore },
} = window;
const { Typography } = MuiCore;

export const useColumns = (
    codebaseSpec: EDPCodebaseKubeObjectInterface['spec'],
    classes: { [key: string]: any },
    theme: any
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
                name: 'Framework',
                value: codebaseSpec.buildTool,
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
