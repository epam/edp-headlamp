import { Grid } from '@mui/material';
import React from 'react';
import { useTableSettings } from '../../../../../../../components/Table/components/TableSettings/hooks/useTableSettings';
import { getSavedColumnData } from '../../../../../../../components/Table/components/TableSettings/utils';
import { TableColumn } from '../../../../../../../components/Table/types';
import { TextWithTooltip } from '../../../../../../../components/TextWithTooltip';
import {
  BUILD_TOOL_ICON_MAPPING,
  FRAMEWORK_ICON_MAPPING,
  LANGUAGE_ICON_MAPPING,
} from '../../../../../../../configs/icon-mappings';
import { TABLES } from '../../../../../../../constants/tables';
import { RESOURCE_ICON_NAMES } from '../../../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../../../icons/UseSpriteSymbol';
import { TemplateKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/Template/types';
import { getCodebaseMappingByCodebaseType } from '../../../../../../../utils/getCodebaseMappingByCodebaseType';
import { rem } from '../../../../../../../utils/styling/rem';
import { columnNames } from '../constants';

export const useColumns = (): TableColumn<TemplateKubeObjectInterface>[] => {
  const { loadSettings } = useTableSettings(TABLES.TEMPLATE_LIST.id);
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
          baseWidth: 5,
          width: getSavedColumnData(tableSettings, columnNames.ICON)?.width ?? 5,
          show: getSavedColumnData(tableSettings, columnNames.ICON)?.show ?? true,
          isFixed: true,
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
          baseWidth: 20,
          width: getSavedColumnData(tableSettings, columnNames.NAME)?.width ?? 20,
          show: getSavedColumnData(tableSettings, columnNames.NAME)?.show ?? true,
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
          baseWidth: 25,
          width: getSavedColumnData(tableSettings, columnNames.DESCRIPTION)?.width ?? 25,
          show: getSavedColumnData(tableSettings, columnNames.DESCRIPTION)?.show ?? true,
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
          baseWidth: 5,
          width: getSavedColumnData(tableSettings, columnNames.TYPE)?.width ?? 5,
          show: getSavedColumnData(tableSettings, columnNames.TYPE)?.show ?? true,
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
          baseWidth: 5,
          width: getSavedColumnData(tableSettings, columnNames.CATEGORY)?.width ?? 5,
          show: getSavedColumnData(tableSettings, columnNames.CATEGORY)?.show ?? true,
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
          baseWidth: 10,
          width: getSavedColumnData(tableSettings, columnNames.LANGUAGE)?.width ?? 10,
          show: getSavedColumnData(tableSettings, columnNames.LANGUAGE)?.show ?? true,
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
          baseWidth: 10,
          width: getSavedColumnData(tableSettings, columnNames.FRAMEWORK)?.width ?? 10,
          show: getSavedColumnData(tableSettings, columnNames.FRAMEWORK)?.show ?? true,
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
          baseWidth: 10,
          width: getSavedColumnData(tableSettings, columnNames.BUILD_TOOL)?.width ?? 10,
          show: getSavedColumnData(tableSettings, columnNames.BUILD_TOOL)?.show ?? true,
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
          baseWidth: 5,
          width: getSavedColumnData(tableSettings, columnNames.MATURITY)?.width ?? 5,
          show: getSavedColumnData(tableSettings, columnNames.MATURITY)?.show ?? true,
        },
      },
    ],
    [tableSettings]
  );
};
