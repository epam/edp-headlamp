import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { TableColumn } from '../../../../../components/Table/types';
import { TextWithTooltip } from '../../../../../components/TextWithTooltip';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { columnNames } from '../../../../cdpipeline-list/components/CDPipelineList/constants';
import { routePipelineRunDetails } from '../../pipeline-run-details/route';

export const useColumns = (): TableColumn<string>[] => {
  return React.useMemo(
    () => [
      {
        id: columnNames.NAME,
        label: 'Name',
        data: {
          render: ({ data }) => (
            <Link
              routeName={routePipelineRunDetails.path}
              params={{
                name: data,
                namespace: getDefaultNamespace(),
              }}
            >
              <TextWithTooltip text={data} />
            </Link>
          ),
        },
        cell: {
          customizable: false,
          baseWidth: 100,
          width: 100,
        },
      },
    ],
    []
  );
};
