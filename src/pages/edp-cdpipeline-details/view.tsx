import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObject } from '../../k8s/EDPCDPipelineStage';
import { CDPIPELINES_ROUTE_NAME } from '../../routes/names';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { CDPipelineStagesTable } from './components/CDPipelineStageList';
import { GeneralInfoTable } from './components/GeneralInfoTable';
import { MetadataTable } from './components/MetadataTable';
import { PageHeaderActions } from './components/PageHeaderActions';
import { useStyles } from './styles';
import { EDPCDPipelineDetailsProps } from './types';

const {
    pluginLib: { React, ReactRouter, MuiCore, Iconify },
} = globalThis;
const { useParams } = ReactRouter;
const { Link } = ReactRouter;
const { Typography, Button } = MuiCore;
const { Icon } = Iconify;

export const EDPCDPipelineDetails: React.FC<EDPCDPipelineDetailsProps> = (): React.ReactElement => {
    const classes = useStyles();
    const { namespace, name } = useParams();
    const [cdpipeline, setCdpipeline] = React.useState<EDPCDPipelineKubeObjectInterface | null>(
        null
    );
    const [, setError] = React.useState<string | null>(null);

    EDPCDPipelineKubeObject.useApiGet(setCdpipeline, name, namespace, setError);

    return (
        <>
            <div className={classes.pageHeading}>
                <Button
                    startIcon={<Icon icon={'eva:arrow-back-outline'} />}
                    size="small"
                    component={Link}
                    to={createRouteURL(CDPIPELINES_ROUTE_NAME)}
                />
                <Typography variant={'h1'} component={'span'}>
                    {name}
                </Typography>
                {cdpipeline && (
                    <div style={{ marginLeft: 'auto' }}>
                        <PageHeaderActions
                            kubeObject={EDPCDPipelineKubeObject}
                            kubeObjectData={cdpipeline}
                        />
                    </div>
                )}
            </div>
            {cdpipeline && (
                <>
                    <GeneralInfoTable kubeObjectData={cdpipeline} />
                    <MetadataTable kubeObjectData={cdpipeline} />
                    <CDPipelineStagesTable
                        kubeObject={EDPCDPipelineStageKubeObject}
                        kubeObjectData={cdpipeline}
                    />
                </>
            )}
        </>
    );
};
