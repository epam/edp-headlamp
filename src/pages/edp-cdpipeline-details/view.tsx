import { ICON_ARROW_LEFT } from '../../constants/icons';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObject } from '../../k8s/EDPCDPipelineStage';
import { Iconify, MuiCore, React, ReactRouter } from '../../plugin.globals';
import { CDPIPELINES_ROUTE_NAME } from '../../routes/names';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { CDPipelineStagesTable } from './components/CDPipelineStageList';
import { GeneralInfoTable } from './components/GeneralInfoTable';
import { MetadataTable } from './components/MetadataTable';
import { PageHeaderActions } from './components/PageHeaderActions';
import { useStyles } from './styles';
import { EDPCDPipelineDetailsProps } from './types';

const { Icon } = Iconify;
const { Typography, Button } = MuiCore;
const { useParams, Link } = ReactRouter;

export const EDPCDPipelineDetails: React.FC<EDPCDPipelineDetailsProps> = (): React.ReactElement => {
    const classes = useStyles();
    const { namespace, name } = useParams();
    const [cdpipeline, setCdpipeline] = React.useState<EDPCDPipelineKubeObjectInterface>(null);
    const [, setError] = React.useState<string>(null);

    EDPCDPipelineKubeObject.useApiGet(setCdpipeline, name, namespace, setError);

    return (
        <>
            <div className={classes.pageHeading}>
                <Button
                    startIcon={<Icon icon={ICON_ARROW_LEFT} />}
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
