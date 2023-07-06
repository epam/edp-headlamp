import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { CodebaseAdvancedInfoTable } from '../../components/CodebaseAdvancedInfoTable';
import { CodebaseBranchesList } from '../../components/CodebaseBranchesList';
import { CodebaseGeneralInfoTable } from '../../components/CodebaseGeneralInfoTable';
import { CodebaseMetadataTable } from '../../components/CodebaseMetadataTable';
import { PageWrapper } from '../../components/PageWrapper';
import { Render } from '../../components/Render';
import { streamCodebase } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { routeEDPComponentList } from '../edp-component-list/route';
import { CodebaseActions } from './components/CodebaseActions';
import { EDPComponentDetailsRouteParams } from './types';

export const PageView = () => {
    const { namespace, name } = useParams<EDPComponentDetailsRouteParams>();
    const [component, setComponent] = React.useState<EDPCodebaseKubeObjectInterface>(null);
    const [, setError] = React.useState<Error>(null);

    const handleStoreComponent = React.useCallback((component: EDPCodebaseKubeObjectInterface) => {
        setComponent(component);
    }, []);

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamCodebase(name, namespace, handleStoreComponent, handleError);

        return () => cancelStream();
    }, [handleError, handleStoreComponent, name, namespace]);

    return (
        <PageWrapper
            breadcrumbs={[
                {
                    label: 'Components',
                    url: {
                        pathname: routeEDPComponentList.path,
                    },
                },
                {
                    label: name,
                },
            ]}
            headerSlot={
                <div style={{ marginLeft: 'auto' }}>
                    <Render condition={!!component}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <CodebaseMetadataTable codebaseData={component} />
                            </Grid>
                            <Grid item>
                                <ResourceActionListContextProvider>
                                    <CodebaseActions codebase={component} />
                                </ResourceActionListContextProvider>
                            </Grid>
                        </Grid>
                    </Render>
                </div>
            }
        >
            <Render condition={!!component}>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={8}>
                        <ResourceActionListContextProvider>
                            <CodebaseBranchesList codebaseData={component} />
                        </ResourceActionListContextProvider>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <CodebaseGeneralInfoTable codebaseData={component} />
                        <CodebaseAdvancedInfoTable kubeObjectData={component} />
                    </Grid>
                </Grid>
            </Render>
        </PageWrapper>
    );
};
