import { CodebaseFieldInterface } from '../../../types';

export interface AdvancedJiraMappingProps extends CodebaseFieldInterface {}

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
