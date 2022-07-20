import { CodebaseAdvancedInfoTable } from '../../components/CodebaseAdvancedInfoTable';
import { CodebaseBranchesList } from '../../components/CodebaseBranchesList';
import { CodebaseGeneralInfoTable } from '../../components/CodebaseGeneralInfoTable';
import { CodebaseMetadataTable } from '../../components/CodebaseMetadataTable';
import { ICON_ARROW_LEFT } from '../../constants/icons';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { EDPCodebaseBranchKubeObject } from '../../k8s/EDPCodebaseBranch';
import { APPLICATIONS_ROUTE_NAME } from '../../routes/names';
import { createRouteURL } from '../../utils/routes/createRouteURL';
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
    const [application, setApplication] = React.useState<EDPCodebaseKubeObjectInterface>(null);
    const [, setError] = React.useState<string>(null);

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
                    <CodebaseGeneralInfoTable kubeObjectData={application} />
                    <CodebaseAdvancedInfoTable kubeObjectData={application} />
                    <CodebaseMetadataTable kubeObjectData={application} />
                    <CodebaseBranchesList
                        kubeObject={EDPCodebaseBranchKubeObject}
                        kubeObjectData={application}
                    />
                </>
            )}
        </>
    );
};
