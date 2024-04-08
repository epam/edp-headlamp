import { Grid, styled } from '@mui/material';
import React from 'react';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { QuickLinkKubeObject } from '../../../../k8s/QuickLink';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { AddNewQuickLinkCard } from './components/AddNewQuickLinkCard';
import { ComponentCard } from './components/ComponentCard';

const StyledGrid = styled(Grid)`
  ${(props) => props.theme.breakpoints.up('xl')} {
    flex: 1 0 20% !important;
    max-width: 20% !important;
  }
`;

const StyledGridItem = styled(Grid)`
  ${(props) => props.theme.breakpoints.up('xl')} {
    flex: 1 0 20% !important;
    max-width: 20% !important;
  }
`;

export const ComponentList = () => {
  const [items, error] = QuickLinkKubeObject.useList({
    namespace: getDefaultNamespace(),
  });

  return error ? (
    <ErrorContent error={error} outlined />
  ) : (
    <LoadingWrapper isLoading={items === null}>
      <Grid container spacing={3}>
        {items
          ? items.map((el) => {
              return el?.spec.visible ? (
                <StyledGrid item xs={4} sm={3} xl={'auto'} key={el.metadata.uid}>
                  <ComponentCard component={el.jsonData} />
                </StyledGrid>
              ) : null;
            })
          : null}
        <StyledGridItem item xs={4} sm={3} xl={'auto'}>
          <AddNewQuickLinkCard />
        </StyledGridItem>
      </Grid>
    </LoadingWrapper>
  );
};
