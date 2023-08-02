import { SectionBox, SectionHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { NameValueTable } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Box } from '@material-ui/core';
import React from 'react';
import { useRows } from './hooks/useRows';
import { CodebaseGeneralInfoTableProps } from './types';

export const CodebaseGeneralInfoTable = ({ codebaseData }: CodebaseGeneralInfoTableProps) => {
    const columns = useRows(codebaseData);

    return (
        <SectionBox title={<SectionHeader title={'General Info'} headerStyle="label" />}>
            <Box>
                <NameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
