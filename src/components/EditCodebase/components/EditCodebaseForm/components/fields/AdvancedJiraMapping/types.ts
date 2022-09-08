import { CreationFormFieldInterface } from '../../../../../../../types/forms';

export interface AdvancedJiraMappingProps extends CreationFormFieldInterface {}

export interface AdvancedMappingRow {
    label: string;
    value: string;
    jiraPattern: string;
}

export interface AdvancedMappingItem {
    label: string;
    value: string;
    isUsed: boolean;
}
