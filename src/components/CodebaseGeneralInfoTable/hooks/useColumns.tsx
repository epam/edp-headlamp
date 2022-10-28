import { ClassNameMap } from '@material-ui/styles';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { MuiCore, React } from '../../../plugin.globals';
import { DeepPartial } from '../../../types/global';

const { Typography } = MuiCore;

export const useColumns = (
    kubeObjectData: DeepPartial<EDPCodebaseKubeObjectInterface>,
    classes: ClassNameMap
) =>
    React.useMemo(() => {
        const { spec, status } = kubeObjectData;

        return [
            {
                name: 'Status',
                value: status.status,
            },
            {
                name: 'Language',
                value: spec.lang,
            },
            {
                name: 'Empty Project',
                value: (
                    <Typography className={classes.statusLabel} component="span">
                        {spec.emptyProject ? 'Yes' : 'No'}
                    </Typography>
                ),
            },
            {
                name: 'Build tool',
                value: spec.buildTool,
            },
            {
                name: 'Framework',
                value: spec.framework,
            },
            {
                name: 'Strategy',
                value: spec.strategy,
            },
            {
                name: 'Default Branch',
                value: spec.defaultBranch,
            },
        ];
    }, [kubeObjectData, classes.statusLabel]);
