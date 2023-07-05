import { SectionBox, SectionHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box } from '@material-ui/core';
import React from 'react';
import { HeadlampNameValueTable } from '../../../../components/HeadlampNameValueTable';
import { useColumns } from './hooks/useColumns';
import { GeneralInfoTableProps } from './types';

export const GeneralInfoTable = ({ gitServerData }: GeneralInfoTableProps) => {
    const { spec } = gitServerData;

    const columns = useColumns(spec);

    return (
        <SectionBox title={<SectionHeader title={'General Info'} headerStyle="label" />}>
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
