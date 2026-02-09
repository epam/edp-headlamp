import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Chip, Grid, Typography } from '@mui/material';
import React from 'react';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { useTableSettings } from '../../../../../components/Table/components/TableSettings/hooks/useTableSettings';
import { getSyncedColumnData } from '../../../../../components/Table/components/TableSettings/utils';
import { TableColumn } from '../../../../../components/Table/types';
import { TextWithTooltip } from '../../../../../components/TextWithTooltip';
import { CodebaseInterface } from '../../../../../configs/codebase-mappings/types';
import { getIconByPattern } from '../../../../../configs/icon-mappings';
import { CODEBASE_TYPE } from '../../../../../constants/codebaseTypes';
import { MAIN_COLOR } from '../../../../../constants/colors';
import { CUSTOM_RESOURCE_STATUS } from '../../../../../constants/statuses';
import { TABLE } from '../../../../../constants/tables';
import { UseSpriteSymbol } from '../../../../../icons/UseSpriteSymbol';
import { CodebaseKubeObject } from '../../../../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectInterface } from '../../../../../k8s/groups/EDP/Codebase/types';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getCodebaseMappingByCodebaseType } from '../../../../../utils/getCodebaseMappingByCodebaseType';
import { rem } from '../../../../../utils/styling/rem';
import { routeComponentDetails } from '../../../../component-details/route';
import { useTypedPermissions } from '../../../hooks/useTypedPermissions';
import { Actions } from '../../ComponentActions';
import { columnNames } from '../constants';

const getColorByType = (type: string) => {
  switch (type) {
    case CODEBASE_TYPE.SYSTEM:
      return MAIN_COLOR.GREY;
    case CODEBASE_TYPE.INFRASTRUCTURE:
      return MAIN_COLOR.DARK_PURPLE;
    case CODEBASE_TYPE.APPLICATION:
      return MAIN_COLOR.GREEN;
    case CODEBASE_TYPE.AUTOTEST:
      return MAIN_COLOR.ORANGE;
    case CODEBASE_TYPE.LIBRARY:
      return MAIN_COLOR.BLUE;
    default:
      return MAIN_COLOR.GREY;
  }
};

const getChipSX = (type: string) => {
  const color = getColorByType(type);

  return {
    color: (t: DefaultTheme) => t.palette.common.white,
    backgroundColor: color,
    borderColor: 'transparent',
  };
};

export const useColumns = (): TableColumn<CodebaseKubeObjectInterface>[] => {
  const permissions = useTypedPermissions();

  const { loadSettings } = useTableSettings(TABLE.COMPONENT_LIST.id);

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
                {status === CUSTOM_RESOURCE_STATUS.FAILED && (
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
              spec: { lang: _lang, type },
            },
          }) => {
            const codebaseMapping = getCodebaseMappingByCodebaseType(type) as Record<
              string,
              CodebaseInterface
            >;
            const lang = _lang.toLowerCase();
            const codebaseMappingByLang = codebaseMapping?.[lang];

            return (
              <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                <Grid item>
                  <UseSpriteSymbol name={getIconByPattern(_lang)} width={20} height={20} />
                </Grid>
                <Grid item>
                  {codebaseMappingByLang?.language?.name || capitalizeFirstLetter(_lang)}
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
              spec: { lang: _lang, framework: _framework, type },
            },
          }) => {
            const codebaseMapping = getCodebaseMappingByCodebaseType(type) as Record<
              string,
              CodebaseInterface
            >;
            const lang = _lang.toLowerCase();
            const framework = _framework ? _framework.toLowerCase() : 'N/A';
            const codebaseMappingByLang = codebaseMapping?.[lang];

            return (
              <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                <Grid item>
                  <UseSpriteSymbol name={getIconByPattern(framework)} width={20} height={20} />
                </Grid>
                <Grid item>
                  {framework
                    ? codebaseMappingByLang?.frameworks?.[framework]?.name ||
                      (_framework && capitalizeFirstLetter(_framework)) ||
                      'N/A'
                    : 'N/A'}
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
              spec: { lang: _lang, buildTool: _buildTool, type },
            },
          }) => {
            const codebaseMapping = getCodebaseMappingByCodebaseType(type) as Record<
              string,
              CodebaseInterface
            >;
            const lang = _lang.toLowerCase();
            const buildTool = _buildTool.toLowerCase();
            const codebaseMappingByLang = codebaseMapping?.[lang];

            return (
              <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                <Grid item>
                  <UseSpriteSymbol name={getIconByPattern(buildTool)} width={20} height={20} />
                </Grid>
                <Grid item>
                  {codebaseMappingByLang?.buildTools?.[buildTool]?.name ||
                    capitalizeFirstLetter(_buildTool)}
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
                //@ts-ignore
                resource={data?.jsonData ?? data}
                permissions={permissions}
                disabled={{
                  boolean: data.spec.type === CODEBASE_TYPE.SYSTEM,
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
