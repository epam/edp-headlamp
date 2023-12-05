import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { InfoColumnsAccordion } from '../../components/InfoColumns';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { Resources } from '../../icons/sprites/Resources';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { rem } from '../../utils/styling/rem';
import { routeEDPComponentList } from '../edp-component-list/route';
import { CodebaseActions } from './components/CodebaseActions';
import { CodebaseBranchesList } from './components/CodebaseBranchesList';
import { CodebaseMetadataTable } from './components/CodebaseMetadataTable';
import { useInfoRows } from './hooks/useInfoRows';
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
        const cancelStream = EDPCodebaseKubeObject.streamItem(
            name,
            namespace,
            handleStoreComponent,
            handleError
        );

        return () => cancelStream();
    }, [handleError, handleStoreComponent, name, namespace]);

    const infoRows = useInfoRows(component);

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
                <>
                    {!!component && (
                        <div style={{ marginLeft: 'auto' }}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <CodebaseMetadataTable codebaseData={component} />
                                </Grid>
                                <Grid item>
                                    <ResourceActionListContextProvider>
                                        <CodebaseActions
                                            codebase={component}
                                            backRoute={Router.createRouteURL(
                                                routeEDPComponentList.path
                                            )}
                                        />
                                    </ResourceActionListContextProvider>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </>
            }
        >
            <Section
                title={name}
                description={
                    'Review your codebases, monitor their status, and execute build pipelines.'
                }
            >
                <Resources />
                {!!component && (
                    <>
                        <Grid container spacing={8}>
                            <Grid item xs={12} style={{ marginTop: rem(20) }}>
                                <InfoColumnsAccordion
                                    infoRows={infoRows}
                                    title={'Component Details'}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ResourceActionListContextProvider>
                                    <CodebaseBranchesList codebaseData={component} />
                                </ResourceActionListContextProvider>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Section>
        </PageWrapper>
    );
};
