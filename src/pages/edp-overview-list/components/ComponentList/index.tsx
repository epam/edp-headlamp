import { Grid } from '@mui/material';
import React from 'react';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { QuickLinkKubeObject } from '../../../../k8s/QuickLink';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { AddNewQuickLinkCard } from './components/AddNewQuickLinkCard';
import { ComponentCard } from './components/ComponentCard';

export const ComponentList = () => {
  const [items] = QuickLinkKubeObject.useList({
    namespace: getDefaultNamespace(),
  });

  return (
    <LoadingWrapper isLoading={items === null}>
      <Grid container spacing={2}>
        {items
          ? items.map((el) => {
              return el?.spec.visible ? (
                <Grid item xs={6} sm={4} md={3} lg={2} xl={1} key={el.metadata.uid}>
                  <ComponentCard component={el} />
                </Grid>
              ) : null;
            })
          : null}
        <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
          <AddNewQuickLinkCard />
        </Grid>
      </Grid>
    </LoadingWrapper>
  );
};
