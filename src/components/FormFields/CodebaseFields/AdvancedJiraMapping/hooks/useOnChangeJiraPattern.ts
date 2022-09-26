import { useFormContext } from 'react-hook-form';
import { React } from '../../../../../plugin.globals';
import { FieldEvent, FieldEventTarget, FormNameObject } from '../../../../../types/forms';
import { AdvancedMappingRow } from '../types';
import { getJiraIssueMetadataPayload } from '../utils';

interface useOnChangeJiraPatternProps {
    setAdvancedMappingRows: React.Dispatch<React.SetStateAction<AdvancedMappingRow[]>>;
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
}
export const useOnChangeJiraPattern = ({
    setAdvancedMappingRows,
    names,
    handleFormFieldChange,
}: useOnChangeJiraPatternProps): {
    onChangeJiraPattern: (event: FieldEvent, value: any) => void;
} => {
    const { setValue } = useFormContext();

    const onChangeJiraPattern = React.useCallback(
        (event: FieldEvent, value: any) => {
            setAdvancedMappingRows(prev => {
                const newRows = prev.map(el => {
                    if (el.value === value) {
                        return {
                            ...el,
                            jiraPattern: event.target.value || '',
                        };
                    }
                    return el;
                });

                const newJiraIssueMetadataPayload = getJiraIssueMetadataPayload(newRows);

                if (newJiraIssueMetadataPayload) {
                    setValue(names.jiraIssueMetadataPayload.name, newJiraIssueMetadataPayload);
                    handleFormFieldChange({
                        name: names.jiraIssueMetadataPayload.name,
                        value: newJiraIssueMetadataPayload,
                    });
                }
                return newRows;
            });
        },
        [
            handleFormFieldChange,
            names.jiraIssueMetadataPayload.name,
            setAdvancedMappingRows,
            setValue,
        ]
    );

    return { onChangeJiraPattern };
};
