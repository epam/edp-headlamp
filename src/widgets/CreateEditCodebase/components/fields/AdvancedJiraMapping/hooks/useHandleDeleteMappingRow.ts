import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CODEBASE_FORM_NAMES } from '../../../../names';
import { createAdvancedMappingRowName } from '../constants';
import { AdvancedMappingItem, AdvancedMappingRow } from '../types';
import { getJiraIssueMetadataPayload } from '../utils';

interface UseHandleDeleteMappingRowProps {
  setAdvancedMappingRows: React.Dispatch<React.SetStateAction<AdvancedMappingRow[]>>;
  setAdvancedMapping: React.Dispatch<React.SetStateAction<AdvancedMappingItem[]>>;
}

export const useHandleDeleteMappingRow = ({
  setAdvancedMappingRows,
  setAdvancedMapping,
}: UseHandleDeleteMappingRowProps): { handleDeleteMappingRow: (value: any) => void } => {
  const { setValue, resetField } = useFormContext();

  const handleDeleteMappingRow = React.useCallback(
    (value) => {
      setAdvancedMappingRows((prev) => {
        const newRows = prev.filter(({ value: innerValue }) => innerValue !== value);
        const newJiraIssueMetadataPayload = getJiraIssueMetadataPayload(newRows);
        setValue(CODEBASE_FORM_NAMES.jiraIssueMetadataPayload.name, newJiraIssueMetadataPayload);
        return newRows;
      });
      setAdvancedMapping((prev) => {
        return prev.map((el) => {
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
    [resetField, setAdvancedMapping, setAdvancedMappingRows, setValue]
  );

  return { handleDeleteMappingRow };
};
