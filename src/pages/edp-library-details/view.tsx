import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { LIBRARIES_ROUTE_NAME } from '../../routes/names';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { rem } from '../../utils/styling/rem';
import { AdvancedInfoTable } from './components/AdvancedInfoTable';
import { CodebaseBranchesTable } from './components/CodebaseBranchesTable';
import { GeneralInfoTable } from './components/GeneralInfoTable';
import { MetadataTable } from './components/MetadataTable';
import { PageHeaderActions } from './components/PageHeaderActions';
import { useStyles } from './styles';
import { EDPLibraryDetailsProps } from './types';

const {
    pluginLib: { React, ReactRouter, MuiCore, Iconify },
} = globalThis;
const { useParams } = ReactRouter;
const { Link } = ReactRouter;
const { Typography, Button } = MuiCore;
const { Icon } = Iconify;

export const EDPLibraryDetails: React.FC<EDPLibraryDetailsProps> = (): React.ReactElement => {
    const classes = useStyles();
    const { namespace, name } = useParams();
    const [library, setLibrary] = React.useState<EDPCodebaseKubeObjectInterface | null>(null);
    const [, setError] = React.useState<string | null>(null);

    EDPCodebaseKubeObject.useApiGet(setLibrary, name, namespace, setError);

    return (
        <>
            <div className={classes.pageHeading}>
                <Button
                    startIcon={<Icon icon={'ep:arrow-left'} />}
                    size="small"
                    component={Link}
                    to={createRouteURL(LIBRARIES_ROUTE_NAME)}
                >
                    <Typography style={{ paddingTop: rem(3) }}>Back</Typography>
                </Button>
                <Typography variant={'h1'} component={'span'}>
                    {name}
                </Typography>
                {library && (
                    <div style={{ marginLeft: 'auto' }}>
                        <PageHeaderActions
                            kubeObject={EDPCodebaseKubeObject}
                            kubeObjectData={library}
                        />
                    </div>
                )}
            </div>
            {library && (
                <>
                    <GeneralInfoTable kubeObjectData={library} />
                    <AdvancedInfoTable kubeObjectData={library} />
                    <CodebaseBranchesTable
                        kubeObject={EDPCodebaseKubeObject}
                        kubeObjectData={library}
                    />
                    <MetadataTable kubeObjectData={library} />
                </>
            )}
        </>
    );
};
