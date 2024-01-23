import React from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../../../components/PageWrapper';
import { Section } from '../../../../components/Section';
import { EDPComponentKubeObject } from '../../../../k8s/EDPComponent';
import { rem } from '../../../../utils/styling/rem';
import { EditEDPComponentForm } from '../../../../widgets/EditEDPComponentForm';
import { routeEDPComponentList } from '../edp-component-list/route';
import { EDPComponentDetailsRouteParams } from './types';

export const PageView = () => {
  const { name, namespace } = useParams<EDPComponentDetailsRouteParams>();
  const [EDPComponent] = EDPComponentKubeObject.useGet(name, namespace);

  return (
    <PageWrapper
      breadcrumbs={[
        {
          label: 'Links',
          url: {
            pathname: routeEDPComponentList.path,
          },
        },
        {
          label: name,
        },
      ]}
    >
      <Section title={name} description={'Review/edit your link.'}>
        {!!EDPComponent && (
          <div style={{ marginTop: rem(20) }}>
            <EditEDPComponentForm EDPComponent={EDPComponent.jsonData} />
          </div>
        )}
      </Section>
    </PageWrapper>
  );
};
