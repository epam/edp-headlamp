import { Grid } from '@mui/material';
import React from 'react';
import { DataGrid } from '../../../../components/DataGrid';
import { EmptyList } from '../../../../components/EmptyList';
import { Resources } from '../../../../icons/sprites/Resources';
import { EDPTemplateKubeObject } from '../../../../k8s/EDPTemplate';
import { EDPTemplateKubeObjectInterface } from '../../../../k8s/EDPTemplate/types';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { useViewModeContext } from '../../../../providers/ViewMode/hooks';
import { VIEW_MODES } from '../../../../providers/ViewMode/types';
import { CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME } from '../../../../widgets/CreateCodebaseFromTemplate/constants';
import { TemplateCard } from './components/TemplateCard';
import { TemplatesTable } from './components/TemplatesTable';
import { MarketplaceListProps } from './types';

export const MarketplaceList = ({ filterFunction }: MarketplaceListProps) => {
  const { setDialog } = useDialogContext();
  const { viewMode } = useViewModeContext();
  const [items, error] = EDPTemplateKubeObject.useList();

  const handleTemplateClick = React.useCallback(
    (template: EDPTemplateKubeObjectInterface) => {
      if (template) {
        setDialog({
          modalName: CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME,
          forwardedProps: {
            template,
          },
        });
      }
    },
    [setDialog]
  );

  return (
    <>
      <Resources />
      {viewMode === VIEW_MODES.TABLE ? (
        <TemplatesTable
          data={items}
          handleTemplateClick={handleTemplateClick}
          filterFunction={filterFunction}
        />
      ) : viewMode === VIEW_MODES.GRID ? (
        <DataGrid<EDPTemplateKubeObjectInterface>
          data={items}
          error={error}
          isLoading={items === null}
          spacing={2}
          filterFunction={filterFunction}
          emptyListComponent={<EmptyList missingItemName={'templates'} />}
          renderItem={(item) => {
            const key = `marketplace-item-${item?.spec?.displayName}`;

            return (
              <Grid key={key} item xs={12} md={6} lg={4}>
                <TemplateCard handleTemplateClick={handleTemplateClick} template={item} />
              </Grid>
            );
          }}
        />
      ) : null}
    </>
  );
};
