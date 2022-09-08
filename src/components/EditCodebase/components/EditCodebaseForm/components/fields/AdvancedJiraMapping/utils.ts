import { advancedMappingBase } from './constants';
import { AdvancedMappingItem, AdvancedMappingRow } from './types';

export const getJiraIssueMetadataPayloadDefaultValue = (
    jsonFieldValue: string | undefined
): AdvancedMappingRow[] => {
    if (!jsonFieldValue) {
        return [];
    }

    const fieldValues: { [key: string]: string } = JSON.parse(jsonFieldValue);
    const buffer: AdvancedMappingRow[] = [];
    const labelsMap = advancedMappingBase.reduce(
        (acc, cur) => acc.set(cur.value, cur),
        new Map<string, AdvancedMappingItem>()
    );
    for (const [field, value] of Object.entries(fieldValues)) {
        buffer.push({
            label: labelsMap.has(field) ? labelsMap.get(field).label : '',
            value: field,
            jiraPattern: value,
        });
    }
    return buffer;
};

export const getJiraIssueMetadataPayload = (rows: AdvancedMappingRow[]): string => {
    const buffer = rows.reduce((acc, { value, jiraPattern }) => {
        acc[value] = jiraPattern;
        return acc;
    }, {});

    return JSON.stringify(buffer);
};
