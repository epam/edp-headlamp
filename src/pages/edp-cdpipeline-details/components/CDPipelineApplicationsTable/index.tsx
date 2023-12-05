import React from 'react';
import { Section } from '../../../../components/Section';
import { Table } from '../../../../components/Table';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { useColumns } from './hooks/useColumns';

export const CDPipelineApplicationsTable = () => {
    const columns = useColumns();
    const { enrichedApplications } = useDynamicDataContext();

    return (
        <Section title={'Applications'}>
            <Table
                data={enrichedApplications}
                columns={columns}
                isLoading={!enrichedApplications}
                rowsPerPage={5}
            />
        </Section>
    );
};
