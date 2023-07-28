import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldEvent } from '../../../../../../types/forms';
import { CODEBASE_FORM_NAMES } from '../../../../names';
import { AdvancedMappingRow } from '../types';
import { getJiraIssueMetadataPayload } from '../utils';

interface UseOnChangeJiraPatternProps {
    setAdvancedMappingRows: React.Dispatch<React.SetStateAction<AdvancedMappingRow[]>>;
}

export const useOnChangeJiraPattern = ({
    setAdvancedMappingRows,
}: UseOnChangeJiraPatternProps): {
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
                    setValue(
                        CODEBASE_FORM_NAMES.jiraIssueMetadataPayload.name,
                        newJiraIssueMetadataPayload
                    );
                }
                return newRows;
            });
        },
        [setAdvancedMappingRows, setValue]
    );

    return { onChangeJiraPattern };
};
