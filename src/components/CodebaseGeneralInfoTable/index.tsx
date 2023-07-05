import { SectionBox, SectionHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Box } from '@material-ui/core';
import React from 'react';
import { HeadlampNameValueTable } from '../HeadlampNameValueTable';
import { useRows } from './hooks/useRows';
import { CodebaseGeneralInfoTableProps } from './types';

export const CodebaseGeneralInfoTable = ({ codebaseData }: CodebaseGeneralInfoTableProps) => {
    const columns = useRows(codebaseData);

    return (
        <SectionBox title={<SectionHeader title={'General Info'} headerStyle="label" />}>
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
