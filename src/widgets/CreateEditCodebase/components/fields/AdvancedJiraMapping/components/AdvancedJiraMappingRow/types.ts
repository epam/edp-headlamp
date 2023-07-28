import { FieldEvent } from '../../../../../../../types/forms';

export interface AdvancedJiraMappingRowProps {
    label: string;
    value: string;
    handleDeleteMappingRow(value: string): void;
    onChangeJiraPattern: (event: FieldEvent, value: any) => void;
}
