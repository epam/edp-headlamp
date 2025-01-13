import { Grid } from '@mui/material';
import React from 'react';
import { DataGrid } from '../../../../components/DataGrid';
import { EmptyList } from '../../../../components/EmptyList';
import { Shop } from '../../../../icons/other/Shop';
import { Resources } from '../../../../icons/sprites/Resources';
import { TemplateKubeObjectInterface } from '../../../../k8s/groups/EDP/Template/types';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { useViewModeContext } from '../../../../providers/ViewMode/hooks';
import { VIEW_MODES } from '../../../../providers/ViewMode/types';
import { CreateCodebaseFromTemplateDialog } from '../../../../widgets/dialogs/CreateCodebaseFromTemplate';
import { useTypedPermissions } from '../../hooks/useTypedPermissions';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { TemplateCard } from './components/TemplateCard';
import { TemplatesTable } from './components/TemplatesTable';
import { MarketplaceListProps } from './types';

export const MarketplaceList = ({ filterFunction, warning }: MarketplaceListProps) => {
  const { setDialog } = useDialogContext();
  const { viewMode } = useViewModeContext();
  const { templates } = useDynamicDataContext();

  const handleTemplateClick = React.useCallback(
    (template: TemplateKubeObjectInterface) => {
      if (template) {
        setDialog(CreateCodebaseFromTemplateDialog, {
          template: template?.jsonData,
        });
      }
    },
    [setDialog]
  );

  const permissions = useTypedPermissions();

  return (
    <>
      <Resources />
      {viewMode === VIEW_MODES.TABLE ? (
        <TemplatesTable
          data={templates.data}
          handleTemplateClick={handleTemplateClick}
          permissions={permissions}
          filterFunction={filterFunction}
          warning={warning}
          errors={templates.errors}
        />
      ) : viewMode === VIEW_MODES.GRID ? (
        <DataGrid<TemplateKubeObjectInterface>
          data={templates.data}
          errors={templates.errors}
          isLoading={templates.isLoading && (!templates.errors || !templates.errors.length)}
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
                  permissions={permissions}
                />
              </Grid>
            );
          }}
        />
      ) : null}
    </>
  );
};
