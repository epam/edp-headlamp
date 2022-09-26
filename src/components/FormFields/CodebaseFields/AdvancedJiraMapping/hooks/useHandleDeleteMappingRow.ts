import { useFormContext } from 'react-hook-form';
import { React } from '../../../../../plugin.globals';
import { FieldEventTarget, FormNameObject } from '../../../../../types/forms';
import { createAdvancedMappingRowName } from '../constants';
import { AdvancedMappingItem, AdvancedMappingRow } from '../types';
import { getJiraIssueMetadataPayload } from '../utils';

interface useHandleDeleteMappingRowProps {
    setAdvancedMappingRows: React.Dispatch<React.SetStateAction<AdvancedMappingRow[]>>;
    setAdvancedMapping: React.Dispatch<React.SetStateAction<AdvancedMappingItem[]>>;
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
}

export const useHandleDeleteMappingRow = ({
    setAdvancedMappingRows,
    setAdvancedMapping,
    names,
    handleFormFieldChange,
}: useHandleDeleteMappingRowProps): { handleDeleteMappingRow: (value: any) => void } => {
    const { setValue, resetField } = useFormContext();

    const handleDeleteMappingRow = React.useCallback(
        value => {
            setAdvancedMappingRows(prev => {
                const newRows = prev.filter(({ value: innerValue }) => innerValue !== value);
                const newJiraIssueMetadataPayload = getJiraIssueMetadataPayload(newRows);
                setValue(names.jiraIssueMetadataPayload.name, newJiraIssueMetadataPayload);
                handleFormFieldChange({
                    name: names.jiraIssueMetadataPayload.name,
                    value: newJiraIssueMetadataPayload,
                });
                return newRows;
            });
            setAdvancedMapping(prev => {
                return prev.map(el => {
                    if (el.value === value) {
                        return {
                            ...el,
                            isUsed: false,
                        };
                    }

                    return el;
                });
            });
            resetField(createAdvancedMappingRowName(value));
        },
        [
            handleFormFieldChange,
            names.jiraIssueMetadataPayload.name,
            resetField,
            setAdvancedMapping,
            setAdvancedMappingRows,
            setValue,
        ]
    );

    return { handleDeleteMappingRow };
};
