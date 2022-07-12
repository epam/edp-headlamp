import { ICON_ARROW_LEFT } from '../../constants/icons';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { APPLICATIONS_ROUTE_NAME } from '../../routes/names';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { AdvancedInfoTable } from './components/AdvancedInfoTable';
import { CodebaseBranchesTable } from './components/CodebaseBranchesTable';
import { GeneralInfoTable } from './components/GeneralInfoTable';
import { MetadataTable } from './components/MetadataTable';
import { PageHeaderActions } from './components/PageHeaderActions';
import { useStyles } from './styles';
import { EDPApplicationDetailsProps } from './types';

const {
    pluginLib: { React, ReactRouter, MuiCore, Iconify },
} = globalThis;
const { useParams } = ReactRouter;
const { Link } = ReactRouter;
const { Typography, Button } = MuiCore;
const { Icon } = Iconify;

export const EDPApplicationDetails: React.FC<
    EDPApplicationDetailsProps
> = (): React.ReactElement => {
    const classes = useStyles();
    const { namespace, name } = useParams();
    const [application, setApplication] = React.useState<EDPCodebaseKubeObjectInterface | null>(
        null
    );
    const [, setError] = React.useState<string | null>(null);

    EDPCodebaseKubeObject.useApiGet(setApplication, name, namespace, setError);

    return (
        <>
            <div className={classes.pageHeading}>
                <Button
                    startIcon={<Icon icon={ICON_ARROW_LEFT} />}
                    size="small"
                    component={Link}
                    to={createRouteURL(APPLICATIONS_ROUTE_NAME)}
                />
                <Typography variant={'h1'} component={'span'}>
                    {name}
                </Typography>
                {application && (
                    <div style={{ marginLeft: 'auto' }}>
                        <PageHeaderActions
                            kubeObject={EDPCodebaseKubeObject}
                            kubeObjectData={application}
                        />
                    </div>
                )}
            </div>
            {application && (
                <>
                    <GeneralInfoTable kubeObjectData={application} />
                    <AdvancedInfoTable kubeObjectData={application} />
                    <MetadataTable kubeObjectData={application} />
                    <CodebaseBranchesTable
                        kubeObject={EDPCodebaseKubeObject}
                        kubeObjectData={application}
                    />
                </>
            )}
        </>
    );
};
