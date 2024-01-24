import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CODEBASE_FORM_NAMES } from '../../../../names';
import { AdvancedMappingItem, AdvancedMappingRow } from '../types';

interface UseHandleAddMappingRowProps {
  setAdvancedMappingRows: React.Dispatch<React.SetStateAction<AdvancedMappingRow[]>>;
  setAdvancedMapping: React.Dispatch<React.SetStateAction<AdvancedMappingItem[]>>;
  advancedMapping: AdvancedMappingItem[];
}

export const useHandleAddMappingRow = ({
  setAdvancedMappingRows,
  setAdvancedMapping,
  advancedMapping,
}: UseHandleAddMappingRowProps): { handleAddMappingRow: () => void } => {
  const { setValue, watch } = useFormContext();

  const advancedMappingFieldNameValue = watch(CODEBASE_FORM_NAMES.advancedMappingFieldName.name);

  const handleAddMappingRow = React.useCallback(() => {
    setAdvancedMapping((prev) => {
      return prev.map((el) => {
        if (el.value === advancedMappingFieldNameValue) {
          return {
            ...el,
            isUsed: true,
          };
        }

        return el;
      });
    });
    setAdvancedMappingRows((prev) => {
      const [advancedMappingItemFitByName] = advancedMapping.filter(
        ({ value }) => value === advancedMappingFieldNameValue
      );

      return [
        ...prev,
        {
          label: advancedMappingItemFitByName.label,
          value: advancedMappingItemFitByName.value,
          jiraPattern: '',
        },
      ];
    });
    setValue(CODEBASE_FORM_NAMES.advancedMappingFieldName.name, '');
  }, [
    advancedMapping,
    advancedMappingFieldNameValue,
    setAdvancedMapping,
    setAdvancedMappingRows,
    setValue,
  ]);

  return { handleAddMappingRow };
};
