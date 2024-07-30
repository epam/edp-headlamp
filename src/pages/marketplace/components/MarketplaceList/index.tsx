import { Grid } from '@mui/material';
import React from 'react';
import { DataGrid } from '../../../../components/DataGrid';
import { EmptyList } from '../../../../components/EmptyList';
import { Shop } from '../../../../icons/other/Shop';
import { Resources } from '../../../../icons/sprites/Resources';
import { TemplateKubeObject } from '../../../../k8s/groups/EDP/Template';
import { TemplateKubeObjectInterface } from '../../../../k8s/groups/EDP/Template/types';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { useViewModeContext } from '../../../../providers/ViewMode/hooks';
import { VIEW_MODES } from '../../../../providers/ViewMode/types';
import { CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME } from '../../../../widgets/CreateCodebaseFromTemplate/constants';
import { usePermissionsContext } from '../../providers/Permissions/hooks';
import { TemplateCard } from './components/TemplateCard';
import { TemplatesTable } from './components/TemplatesTable';
import { MarketplaceListProps } from './types';

export const MarketplaceList = ({ filterFunction, warning }: MarketplaceListProps) => {
  const { setDialog } = useDialogContext();
  const { viewMode } = useViewModeContext();
  const [items, error] = TemplateKubeObject.useList();

  const handleTemplateClick = React.useCallback(
    (template: TemplateKubeObjectInterface) => {
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

  const { codebase: codebasePermissions } = usePermissionsContext();

  return (
    <>
      <Resources />
      {viewMode === VIEW_MODES.TABLE ? (
        <TemplatesTable
          data={items}
          handleTemplateClick={handleTemplateClick}
          permissions={codebasePermissions}
          filterFunction={filterFunction}
          warning={warning}
          error={error}
        />
      ) : viewMode === VIEW_MODES.GRID ? (
        <DataGrid<TemplateKubeObjectInterface>
          data={items}
          error={error}
          isLoading={items === null}
          spacing={3}
          filterFunction={filterFunction}
          emptyListComponent={
            warning ? (
              warning
            ) : (
              <EmptyList
                missingItemName={'templates'}
                icon={<Shop width={128} height={128} fill="#A2A7B7" />}
              />
            )
          }
          renderItem={(item) => {
            const key = `marketplace-item-${item?.spec?.displayName}`;

            return (
              <Grid key={key} item xs={12} md={6} lg={4}>
                <TemplateCard
                  handleTemplateClick={handleTemplateClick}
                  template={item}
                  permissions={codebasePermissions}
                />
              </Grid>
            );
          }}
        />
      ) : null}
    </>
  );
};
