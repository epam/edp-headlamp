import { CDPipelineActions } from '../../components/CDPipelineActions';
import { Render } from '../../components/Render';
import { ICONS } from '../../constants/icons';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { streamCDPipeline } from '../../k8s/EDPCDPipeline/streamCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObject } from '../../k8s/EDPCDPipelineStage';
import { Iconify, MuiCore, pluginLib, React, ReactRouter } from '../../plugin.globals';
import { CDPIPELINES_ROUTE_NAME } from '../../routes/names';
import { createRouteName } from '../../utils/routes/createRouteName';
import { CDPipelineMetadataTable } from './components/CDPipelineMetadataTable';
import { CDPipelineStagesList } from './components/CDPipelineStageList';
import { GeneralInfoTable } from './components/GeneralInfoTable';
import { useStyles } from './styles';
import { EDPCDPipelineDetailsProps } from './types';

const { Icon } = Iconify;
const { Typography, Button } = MuiCore;
const { useParams } = ReactRouter;
const {
    CommonComponents: { Link },
} = pluginLib;

export const EDPCDPipelineDetails: React.FC<EDPCDPipelineDetailsProps> = (): React.ReactElement => {
    const classes = useStyles();
    const { namespace, name } = useParams();
    const [CDPipelineData, setCDPipelineData] =
        React.useState<EDPCDPipelineKubeObjectInterface>(null);
    const [, setError] = React.useState<Error>(null);

    const handleStoreCDPipeline = React.useCallback(
        (CDPipelineData: EDPCDPipelineKubeObjectInterface) => {
            setCDPipelineData(CDPipelineData);
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
                    startIcon={<Icon icon={ICONS['ARROW_LEFT']} />}
                    size="small"
                    component={Link}
                    routeName={createRouteName(CDPIPELINES_ROUTE_NAME)}
                />
                <Typography variant={'h1'} component={'span'}>
                    {name}
                </Typography>
                <Render condition={!!CDPipelineData}>
                    <div style={{ marginLeft: 'auto' }}>
                        <CDPipelineActions
                            kubeObject={EDPCDPipelineKubeObject}
                            kubeObjectData={CDPipelineData}
                        />
                    </div>
                </Render>
            </div>
            <Render condition={!!CDPipelineData}>
                <>
                    <GeneralInfoTable CDPipelineData={CDPipelineData} />
                    <CDPipelineMetadataTable CDPipelineData={CDPipelineData} />
                    <CDPipelineStagesList
                        kubeObject={EDPCDPipelineStageKubeObject}
                        CDPipelineData={CDPipelineData}
                    />
                </>
            </Render>
        </>
    );
};
