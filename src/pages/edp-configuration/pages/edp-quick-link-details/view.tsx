import React from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../../../components/PageWrapper';
import { Section } from '../../../../components/Section';
import { QuickLinkKubeObject } from '../../../../k8s/QuickLink';
import { rem } from '../../../../utils/styling/rem';
import { EditQuickLinkForm } from '../../../../widgets/EditQuickLinkForm';
import { routeQuickLinkList } from '../edp-quick-link-list/route';
import { QuickLinkDetailsRouteParams } from './types';

export const PageView = () => {
  const { name, namespace } = useParams<QuickLinkDetailsRouteParams>();
  const [QuickLink] = QuickLinkKubeObject.useGet(name, namespace);

  return (
    <PageWrapper
      breadcrumbs={[
        {
          label: 'Links',
          url: {
            pathname: routeQuickLinkList.path,
          },
        },
        {
          label: name,
        },
      ]}
    >
      <Section title={name} description={'Review/edit your link.'}>
        {!!QuickLink && (
          <div style={{ marginTop: rem(20) }}>
            <EditQuickLinkForm QuickLink={QuickLink?.jsonData} />
          </div>
        )}
      </Section>
    </PageWrapper>
  );
};
