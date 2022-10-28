import { CDPipelineActions } from '../../components/CDPipelineActions';
import { Render } from '../../components/Render';
import { ICONS } from '../../constants/icons';
import {
    EnrichedApplication,
    useApplicationsInCDPipeline,
} from '../../hooks/useApplicationsInCDPipeline';
import { EDPCDPipelineKubeObject } from '../../k8s/EDPCDPipeline';
import { streamCDPipeline } from '../../k8s/EDPCDPipeline/streamCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../k8s/EDPCDPipeline/types';
import { Iconify, MuiCore, pluginLib, React, ReactRouter } from '../../plugin.globals';
import { CDPIPELINES_ROUTE_NAME } from '../../routes/names';
import { createRouteName } from '../../utils/routes/createRouteName';
import { CDPipelineApplicationsTable } from './components/CDPipelineApplicationsTable';
import { CDPipelineMetadataTable } from './components/CDPipelineMetadataTable';
import { CDPipelineStagesList } from './components/CDPipelineStageList';
import { GeneralInfoTable } from './components/GeneralInfoTable';
import { useStyles } from './styles';
import { EDPCDPipelineDetailsProps } from './types';

const { Icon } = Iconify;
const { Typography, Button, Grid } = MuiCore;
const { useParams } = ReactRouter;
const {
    CommonComponents: { Link },
} = pluginLib;

export const ApplicationsContext = React.createContext<EnrichedApplication[]>(null);
export const CDPipelineDataContext = React.createContext<EDPCDPipelineKubeObjectInterface>(null);

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

    const { applications } = useApplicationsInCDPipeline({
        CDPipelineData,
    });

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
                        <Grid container spacing={1}>
                            <Grid item>
                                <CDPipelineMetadataTable CDPipelineData={CDPipelineData} />
                            </Grid>
                            <Grid item>
                                <CDPipelineActions
                                    kubeObject={EDPCDPipelineKubeObject}
                                    kubeObjectData={CDPipelineData}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Render>
            </div>
            <Render condition={!!CDPipelineData}>
                <>
                    <CDPipelineDataContext.Provider value={CDPipelineData}>
                        <ApplicationsContext.Provider value={applications}>
                            <GeneralInfoTable CDPipelineData={CDPipelineData} />
                            <CDPipelineApplicationsTable />
                            <CDPipelineStagesList />
                        </ApplicationsContext.Provider>
                    </CDPipelineDataContext.Provider>
                </>
            </Render>
        </>
    );
};
