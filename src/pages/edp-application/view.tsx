import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { rem } from '../../utils/styling/rem';
import { AdvancedInfoTable } from './components/AdvancedInfoTable';
import { CodebaseBranchesTable } from './components/CodebaseBranchesTable';
import { GeneralInfoTable } from './components/GeneralInfoTable';
import { EDPCodebaseProps } from './types';

const {
    pluginLib: { React, ReactRouter, MuiCore, Iconify },
} = window;
const { useParams } = ReactRouter;
const { Link } = ReactRouter;
const { Typography, Button } = MuiCore;
const { Icon } = Iconify;

export const EDPApplication: React.FC<EDPCodebaseProps> = (): React.ReactElement => {
    const { namespace, name } = useParams();
    const [codebase, setCodebase] = React.useState(null);
    const [, setError] = React.useState(null);

    EDPCodebaseKubeObject.useApiGet(setCodebase, name, namespace, setError);

    return (
        <>
            <Button
                startIcon={<Icon icon={'ep:arrow-left'} />}
                size="small"
                component={Link}
                to={createRouteURL(EDPCodebaseKubeObjectConfig.name.pluralForm)}
            >
                <Typography style={{ paddingTop: rem(3) }}>Back</Typography>
            </Button>
            {codebase && (
                <>
                    <GeneralInfoTable
                        kubeObject={EDPCodebaseKubeObject}
                        kubeObjectData={codebase}
                    />
                    <AdvancedInfoTable kubeObjectData={codebase} />
                    <CodebaseBranchesTable
                        kubeObject={EDPCodebaseKubeObject}
                        kubeObjectData={codebase}
                    />
                </>
            )}
        </>
    );
};
