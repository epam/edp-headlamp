import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Chip, Grid, Typography } from '@mui/material';
import React from 'react';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { useTableSettings } from '../../../../../components/Table/components/TableSettings/hooks/useTableSettings';
import { getSyncedColumnData } from '../../../../../components/Table/components/TableSettings/utils';
import { TableColumn } from '../../../../../components/Table/types';
import { TextWithTooltip } from '../../../../../components/TextWithTooltip';
import {
  BUILD_TOOL_ICON_MAPPING,
  FRAMEWORK_ICON_MAPPING,
  LANGUAGE_ICON_MAPPING,
} from '../../../../../configs/icon-mappings';
import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { MAIN_COLOR } from '../../../../../constants/colors';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../constants/statuses';
import { TABLES } from '../../../../../constants/tables';
import { RESOURCE_ICON_NAMES } from '../../../../../icons/sprites/Resources/names';
import { UseSpriteSymbol } from '../../../../../icons/UseSpriteSymbol';
import { CodebaseKubeObject } from '../../../../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectInterface } from '../../../../../k8s/groups/EDP/Codebase/types';
import { HeadlampKubeObject } from '../../../../../types/k8s';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getCodebaseMappingByCodebaseType } from '../../../../../utils/getCodebaseMappingByCodebaseType';
import { rem } from '../../../../../utils/styling/rem';
import { routeComponentDetails } from '../../../../component-details/route';
import { useTypedPermissions } from '../../../hooks/useTypedPermissions';
import { Actions } from '../../ComponentActions';
import { columnNames } from '../constants';

const getColorByType = (type: string) => {
  switch (type) {
    case CODEBASE_TYPES.SYSTEM:
      return MAIN_COLOR.GREY;
    case CODEBASE_TYPES.INFRASTRUCTURE:
      return MAIN_COLOR.DARK_PURPLE;
    case CODEBASE_TYPES.APPLICATION:
      return MAIN_COLOR.GREEN;
    case CODEBASE_TYPES.AUTOTEST:
      return MAIN_COLOR.ORANGE;
    case CODEBASE_TYPES.LIBRARY:
      return MAIN_COLOR.BLUE;
    default:
      return MAIN_COLOR.GREY;
  }
};

const getChipSX = (type: string) => {
  const color = getColorByType(type);

  return {
    color: (t) => t.palette.common.white,
    backgroundColor: color,
    borderColor: 'transparent',
  };
};

export const useColumns = (): TableColumn<HeadlampKubeObject<CodebaseKubeObjectInterface>>[] => {
  const permissions = useTypedPermissions();

  const { loadSettings } = useTableSettings(TABLES.COMPONENT_LIST.id);

  const tableSettings = loadSettings();

  return React.useMemo(
    () => [
      {
        id: columnNames.STATUS,
        label: 'Status',
        data: {
          columnSortableValuePath: 'status.status',
          render: ({ data }) => {
            const status = data?.status?.status;
            const detailedMessage = data?.status?.detailedMessage;

            const [icon, color, isRotating] = CodebaseKubeObject.getStatusIcon(status);

            const title = (
              <>
                <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                  {`Status: ${status || 'Unknown'}`}
                </Typography>
                {status === CUSTOM_RESOURCE_STATUSES.FAILED && (
                  <Typography variant={'subtitle2'} style={{ marginTop: rem(10) }}>
                    {detailedMessage}
                  </Typography>
                )}
              </>
            );

            return <StatusIcon icon={icon} isRotating={isRotating} color={color} Title={title} />;
          },
        },
        cell: {
          isFixed: true,
          ...getSyncedColumnData(tableSettings, columnNames.STATUS, 5),
          props: {
            align: 'left',
          },
        },
      },
      {
        id: columnNames.NAME,
        label: 'Name',
        data: {
          columnSortableValuePath: 'metadata.name',
          render: ({
            data: {
              metadata: { name, namespace },
            },
          }) => {
            return (
              <Link
                routeName={routeComponentDetails.path}
                params={{
                  name,
                  namespace,
                }}
              >
                <TextWithTooltip text={name} />
              </Link>
            );
          },
        },
        cell: {
          customizable: false,
          ...getSyncedColumnData(tableSettings, columnNames.NAME, 20),
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
          }) => (
            <Chip
              sx={getChipSX(type)}
              size="small"
              variant="outlined"
              label={capitalizeFirstLetter(type)}
            />
          ),
        },
        cell: {
          ...getSyncedColumnData(tableSettings, columnNames.TYPE, 20),
        },
      },
      {
        id: columnNames.LANGUAGE,
        label: 'Language',
        data: {
          columnSortableValuePath: 'spec.lang',
          render: ({
            data: {
              spec: { lang, type },
            },
          }) => {
            const codebaseMapping = getCodebaseMappingByCodebaseType(type);

            return (
              <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                <Grid item>
                  <UseSpriteSymbol
                    name={LANGUAGE_ICON_MAPPING?.[lang?.toLowerCase()] || RESOURCE_ICON_NAMES.OTHER}
                    width={20}
                    height={20}
                  />
                </Grid>
                <Grid item>
                  {codebaseMapping?.[lang]?.language?.name || capitalizeFirstLetter(lang)}
                </Grid>
              </Grid>
            );
          },
        },
        cell: {
          ...getSyncedColumnData(tableSettings, columnNames.LANGUAGE, 15),
        },
      },
      {
        id: columnNames.FRAMEWORK,
        label: 'Framework',
        data: {
          columnSortableValuePath: 'spec.lang',
          render: ({
            data: {
              spec: { lang, framework, type },
            },
          }) => {
            const codebaseMapping = getCodebaseMappingByCodebaseType(type);

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
                  {codebaseMapping?.[lang]?.frameworks?.[framework]?.name ||
                    capitalizeFirstLetter(framework)}
                </Grid>
              </Grid>
            );
          },
        },
        cell: {
          ...getSyncedColumnData(tableSettings, columnNames.FRAMEWORK, 15),
        },
      },
      {
        id: columnNames.BUILD_TOOL,
        label: 'Build Tool',
        data: {
          columnSortableValuePath: 'spec.buildTool',
          render: ({
            data: {
              spec: { lang, buildTool, type },
            },
          }) => {
            const codebaseMapping = getCodebaseMappingByCodebaseType(type);

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
                  {codebaseMapping?.[lang]?.buildTools?.[buildTool]?.name ||
                    capitalizeFirstLetter(buildTool)}
                </Grid>
              </Grid>
            );
          },
        },
        cell: {
          ...getSyncedColumnData(tableSettings, columnNames.BUILD_TOOL, 15),
        },
      },

      {
        id: columnNames.ACTIONS,
        label: 'Actions',
        data: {
          render: ({ data }) => {
            return (
              <Actions
                resource={data?.jsonData ?? data}
                permissions={permissions}
                disabled={{
                  boolean: data.spec.type === CODEBASE_TYPES.SYSTEM,
                  reason: 'System components cannot be managed',
                }}
              />
            );
          },
        },
        cell: {
          customizable: false,
          isFixed: true,
          ...getSyncedColumnData(tableSettings, columnNames.ACTIONS, 5),
          props: {
            align: 'center',
          },
        },
      },
    ],
    [permissions, tableSettings]
  );
};
