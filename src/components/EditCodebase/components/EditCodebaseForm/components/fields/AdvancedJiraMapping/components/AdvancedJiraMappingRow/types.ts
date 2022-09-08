import { SyntheticEvent } from 'react';

export interface AdvancedJiraMappingRowProps {
    label: string;
    value: string;
    handleDeleteMappingRow(value: string): void;
    onChangeJiraPattern(event: SyntheticEvent, value: string): void;
}
