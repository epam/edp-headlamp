import { useSnackbar } from 'notistack';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { createAdvancedMappingRowName } from '../constants';
import { getJiraIssueMetadataPayloadDefaultValue } from '../utils';

export const useUpdateJiraMapping = ({ names, setAdvancedMapping, setAdvancedMappingRows }) => {
    const { watch, setValue } = useFormContext();
    const { enqueueSnackbar } = useSnackbar();

    const jiraIssueMetadataPayloadFieldValue = watch(names.jiraIssueMetadataPayload.name);

    React.useEffect(() => {
        const newRows = getJiraIssueMetadataPayloadDefaultValue(jiraIssueMetadataPayloadFieldValue);

        for (const { value, jiraPattern } of newRows) {
            setValue(createAdvancedMappingRowName(value), jiraPattern);
        }

        setAdvancedMapping(prevAdvancedMapping => {
            return prevAdvancedMapping.map(el => {
                const [fitItem] = newRows.filter(innerEl => innerEl.value === el.value);
                return {
                    ...el,
                    isUsed: !!fitItem,
                };
            });
        });
        setAdvancedMappingRows(newRows);
    }, [
        enqueueSnackbar,
        jiraIssueMetadataPayloadFieldValue,
        setAdvancedMapping,
        setAdvancedMappingRows,
        setValue,
    ]);
};
