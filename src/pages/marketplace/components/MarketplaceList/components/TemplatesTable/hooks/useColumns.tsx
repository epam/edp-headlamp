import { Grid, Tooltip } from '@mui/material';
import React from 'react';
import { TableColumn } from '../../../../../../../components/Table/types';
import {
  BUILD_TOOL_ICON_MAPPING,
  FRAMEWORK_ICON_MAPPING,
  LANGUAGE_ICON_MAPPING,
} from '../../../../../../../configs/icon-mappings';
import { RESOURCE_ICON_NAMES } from '../../../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../../../icons/UseSpriteSymbol';
import { TemplateKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/Template/types';
import { getCodebaseMappingByCodebaseType } from '../../../../../../../utils/getCodebaseMappingByCodebaseType';
import { rem } from '../../../../../../../utils/styling/rem';
export const useColumns = (): TableColumn<TemplateKubeObjectInterface>[] => {
  return React.useMemo(
    () => [
      {
        id: 'icon',
        label: '',
        render: ({ spec: { icon } }) => {
          return (
            <img
              style={{ height: rem(30), verticalAlign: 'middle' }}
              src={`data:${icon[0].mediatype};base64,${icon[0].base64data}`}
              alt=""
            />
          );
        },
        width: '3%',
      },
      {
        id: 'name',
        label: 'Name',
        columnSortableValuePath: 'spec.displayName',
        render: ({ spec: { description, displayName } }) => (
          <Tooltip title={description}>
            <>{displayName}</>
          </Tooltip>
        ),
        width: '20%',
      },
      {
        id: 'type',
        label: 'Type',
        columnSortableValuePath: 'spec.type',
        render: ({ spec: { type } }) => type,
        width: '12%',
      },
      {
        id: 'category',
        label: 'Category',
        columnSortableValuePath: 'spec.category',
        render: ({ spec: { category } }) => category,
        width: '12%',
      },
      {
        id: 'language',
        label: 'Language',
        columnSortableValuePath: 'spec.language',
        render: ({ spec: { language, type } }) => {
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
        width: '12%',
      },
      {
        id: 'framework',
        label: 'Framework',
        columnSortableValuePath: 'spec.framework',
        render: ({ spec: { language, framework, type } }) => {
          const codebaseMapping = getCodebaseMappingByCodebaseType(type);

          if (!codebaseMapping) {
            return framework;
          }

          return (
            <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
              <Grid item>
                <UseSpriteSymbol
                  name={
                    FRAMEWORK_ICON_MAPPING?.[framework?.toLowerCase()] || RESOURCE_ICON_NAMES.OTHER
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
        width: '12%',
      },
      {
        id: 'buildTool',
        label: 'Build Tool',
        columnSortableValuePath: 'spec.buildTool',
        render: ({ spec: { language, buildTool, type } }) => {
          const codebaseMapping = getCodebaseMappingByCodebaseType(type);

          if (!codebaseMapping) {
            return buildTool;
          }

          return (
            <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
              <Grid item>
                <UseSpriteSymbol
                  name={
                    BUILD_TOOL_ICON_MAPPING?.[buildTool?.toLowerCase()] || RESOURCE_ICON_NAMES.OTHER
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
        width: '12%',
      },
      {
        id: 'maturity',
        label: 'Maturity',
        columnSortableValuePath: 'spec.maturity',
        render: ({ spec: { maturity } }) => maturity,
      },
    ],
    []
  );
};
