import { Render } from '../../components/Render';
import { ICON_ARROW_LEFT } from '../../constants/icons';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { streamCDPipeline } from '../../k8s/EDPCDPipeline/streamCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObject } from '../../k8s/EDPCDPipelineStage';
import { Iconify, MuiCore, React, ReactRouter } from '../../plugin.globals';
import { CDPIPELINES_ROUTE_NAME } from '../../routes/names';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { CDPipelineStagesList } from './components/CDPipelineStageList';
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
    const [CDPipeline, setCDPipeline] = React.useState<EDPCDPipelineKubeObjectInterface>(null);
    const [, setError] = React.useState<string>(null);

    const handleStoreCDPipeline = React.useCallback(
        (CDPipeline: EDPCDPipelineKubeObjectInterface) => {
            setCDPipeline(CDPipeline);
        },
        []
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamCDPipeline(name, namespace, handleStoreCDPipeline, handleError);

        return () => cancelStream();
    }, [handleError, handleStoreCDPipeline, name, namespace]);

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
                <Render condition={!!CDPipeline}>
                    <div style={{ marginLeft: 'auto' }}>
                        <PageHeaderActions
                            kubeObject={EDPCDPipelineKubeObject}
                            kubeObjectData={CDPipeline}
                        />
                    </div>
                </Render>
            </div>
            <Render condition={!!CDPipeline}>
                <>
                    <GeneralInfoTable kubeObjectData={CDPipeline} />
                    <MetadataTable kubeObjectData={CDPipeline} />
                    <CDPipelineStagesList
                        kubeObject={EDPCDPipelineStageKubeObject}
                        kubeObjectData={CDPipeline}
                    />
                </>
            </Render>
        </>
    );
};
