import { Grid } from '@mui/material';
import React from 'react';
import { useTableSettings } from '../../../../../../../components/Table/components/TableSettings/hooks/useTableSettings';
import { getSyncedColumnData } from '../../../../../../../components/Table/components/TableSettings/utils';
import { TableColumn } from '../../../../../../../components/Table/types';
import { TextWithTooltip } from '../../../../../../../components/TextWithTooltip';
import {
  BUILD_TOOL_ICON_MAPPING,
  FRAMEWORK_ICON_MAPPING,
  LANGUAGE_ICON_MAPPING,
} from '../../../../../../../configs/icon-mappings';
import { TABLE } from '../../../../../../../constants/tables';
import { RESOURCE_ICON_NAMES } from '../../../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../../../icons/UseSpriteSymbol';
import { TemplateKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/Template/types';
import { getCodebaseMappingByCodebaseType } from '../../../../../../../utils/getCodebaseMappingByCodebaseType';
import { rem } from '../../../../../../../utils/styling/rem';
import { columnNames } from '../constants';

export const useColumns = (): TableColumn<TemplateKubeObjectInterface>[] => {
  const { loadSettings } = useTableSettings(TABLE.TEMPLATE_LIST.id);
  const tableSettings = loadSettings();

  return React.useMemo(
    () => [
      {
        id: columnNames.ICON,
        label: 'Icon',
        data: {
          render: ({
            data: {
              spec: { icon },
            },
          }) => {
            return (
              <img
                style={{ height: rem(30), verticalAlign: 'middle' }}
                src={`data:${icon[0].mediatype};base64,${icon[0].base64data}`}
                alt=""
              />
            );
          },
        },
        cell: {
          isFixed: true,
          ...getSyncedColumnData(tableSettings, columnNames.ICON, 5),
        },
      },
      {
        id: columnNames.NAME,
        label: 'Name',
        data: {
          columnSortableValuePath: 'spec.displayName',
          render: ({
            data: {
              spec: { displayName },
            },
          }) => <TextWithTooltip text={displayName} />,
        },
        cell: {
          customizable: false,
          ...getSyncedColumnData(tableSettings, columnNames.NAME, 20),
        },
      },
      {
        id: columnNames.DESCRIPTION,
        label: 'Description',
        data: {
          render: ({
            data: {
              spec: { description },
            },
          }) => <TextWithTooltip text={description} maxLineAmount={3} />,
        },
        cell: {
          ...getSyncedColumnData(tableSettings, columnNames.DESCRIPTION, 25),
        },
      },
      {
        id: columnNames.TYPE,
        label: 'Type',
        data: {
          columnSortableValuePath: 'spec.type',
          render: ({
            data: {
              spec: { type },
            },
          }) => type,
        },
        cell: {
          ...getSyncedColumnData(tableSettings, columnNames.TYPE, 5),
        },
      },
      {
        id: columnNames.CATEGORY,
        label: 'Category',
        data: {
          columnSortableValuePath: 'spec.category',
          render: ({
            data: {
              spec: { category },
            },
          }) => category,
        },
        cell: {
          ...getSyncedColumnData(tableSettings, columnNames.CATEGORY, 5),
        },
      },
      {
        id: columnNames.LANGUAGE,
        label: 'Language',
        data: {
          columnSortableValuePath: 'spec.language',
          render: ({
            data: {
              spec: { language, type },
            },
          }) => {
            const codebaseMapping = getCodebaseMappingByCodebaseType(type);
            if (!codebaseMapping) {
              return language;
            }

            return (
              <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                <Grid item>
                  <UseSpriteSymbol
                    name={
                      LANGUAGE_ICON_MAPPING?.[language?.toLowerCase()] || RESOURCE_ICON_NAMES.OTHER
                    }
                    width={20}
                    height={20}
                  />
                </Grid>
                <Grid item>{codebaseMapping?.[language]?.language?.name || language}</Grid>
              </Grid>
            );
          },
        },
        cell: {
          ...getSyncedColumnData(tableSettings, columnNames.LANGUAGE, 10),
        },
      },
      {
        id: columnNames.FRAMEWORK,
        label: 'Framework',
        data: {
          columnSortableValuePath: 'spec.framework',
          render: ({
            data: {
              spec: { language, framework, type },
            },
          }) => {
            const codebaseMapping = getCodebaseMappingByCodebaseType(type);

            if (!codebaseMapping) {
              return framework;
            }

            return (
              <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                <Grid item>
                  <UseSpriteSymbol
                    name={
                      FRAMEWORK_ICON_MAPPING?.[framework?.toLowerCase()] ||
                      RESOURCE_ICON_NAMES.OTHER
                    }
                    width={20}
                    height={20}
                  />
                </Grid>
                <Grid item>
                  {codebaseMapping?.[language]?.frameworks?.[framework]?.name || framework}
                </Grid>
              </Grid>
            );
          },
        },
        cell: {
          ...getSyncedColumnData(tableSettings, columnNames.FRAMEWORK, 10),
        },
      },
      {
        id: columnNames.BUILD_TOOL,
        label: 'Build Tool',
        data: {
          columnSortableValuePath: 'spec.buildTool',
          render: ({
            data: {
              spec: { language, buildTool, type },
            },
          }) => {
            const codebaseMapping = getCodebaseMappingByCodebaseType(type);

            if (!codebaseMapping) {
              return buildTool;
            }

            return (
              <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                <Grid item>
                  <UseSpriteSymbol
                    name={
                      BUILD_TOOL_ICON_MAPPING?.[buildTool?.toLowerCase()] ||
                      RESOURCE_ICON_NAMES.OTHER
                    }
                    width={20}
                    height={20}
                  />
                </Grid>
                <Grid item>
                  {codebaseMapping?.[language]?.buildTools?.[buildTool]?.name || buildTool}
                </Grid>
              </Grid>
            );
          },
        },
        cell: {
          ...getSyncedColumnData(tableSettings, columnNames.BUILD_TOOL, 10),
        },
      },
      {
        id: columnNames.MATURITY,
        label: 'Maturity',
        data: {
          columnSortableValuePath: 'spec.maturity',
          render: ({
            data: {
              spec: { maturity },
            },
          }) => maturity,
        },
        cell: {
          ...getSyncedColumnData(tableSettings, columnNames.MATURITY, 5),
        },
      },
    ],
    [tableSettings]
  );
};
