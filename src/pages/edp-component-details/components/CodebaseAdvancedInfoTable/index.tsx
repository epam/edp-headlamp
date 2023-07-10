import { SectionBox } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { SectionHeader } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Box } from '@material-ui/core';
import React from 'react';
import { HeadlampNameValueTable } from '../../../../components/HeadlampNameValueTable';
import { useRows } from './hooks/useRows';
import { useStyles } from './styles';
import { CodebaseAdvancedInfoTableProps } from './types';

export const CodebaseAdvancedInfoTable = ({ kubeObjectData }: CodebaseAdvancedInfoTableProps) => {
    const { spec } = kubeObjectData;

    const classes = useStyles();
    const columns = useRows(spec, classes);

    return (
        <SectionBox title={<SectionHeader title={'Advanced Settings'} headerStyle="label" />}>
            <Box>
                <HeadlampNameValueTable rows={columns} />
            </Box>
        </SectionBox>
    );
};
