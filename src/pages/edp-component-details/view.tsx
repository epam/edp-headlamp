import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Grid } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { InfoColumnsAccordion } from '../../components/InfoColumns';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { Resources } from '../../icons/sprites/Resources';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { rem } from '../../utils/styling/rem';
import { CodebaseActionsMenu } from '../../widgets/CodebaseActionsMenu';
import { routeEDPComponentList } from '../edp-component-list/route';
import { CodebaseBranchesList } from './components/CodebaseBranchesList';
import { useInfoRows } from './hooks/useInfoRows';
import { QuickLinkDetailsRouteParams } from './types';

export const PageView = () => {
  const { namespace, name } = useParams<QuickLinkDetailsRouteParams>();
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

  const componentType = component?.spec?.type;

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
              {componentType !== CODEBASE_TYPES.SYSTEM && (
                <ResourceActionListContextProvider>
                  <CodebaseActionsMenu
                    data={{
                      codebaseData: component,
                    }}
                    backRoute={Router.createRouteURL(routeEDPComponentList.path)}
                    variant="inline"
                  />
                </ResourceActionListContextProvider>
              )}
            </div>
          )}
        </>
      }
    >
      <Section
        title={name}
        description={'Review your codebases, monitor their status, and execute build pipelines.'}
      >
        <Resources />
        {!!component && (
          <>
            <Grid container spacing={8}>
              <Grid item xs={12} style={{ marginTop: rem(20) }}>
                <InfoColumnsAccordion infoRows={infoRows} title={'Component Details'} />
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
