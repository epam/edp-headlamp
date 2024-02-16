import { Grid } from '@mui/material';
import React from 'react';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { EDPComponentKubeObject } from '../../../../k8s/EDPComponent';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { AddNewComponentCard } from './AddNewComponentCard';
import { ComponentCard } from './components/ComponentCard';

export const ComponentList = () => {
  const [items] = EDPComponentKubeObject.useList({
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
          <AddNewComponentCard />
        </Grid>
      </Grid>
    </LoadingWrapper>
  );
};
