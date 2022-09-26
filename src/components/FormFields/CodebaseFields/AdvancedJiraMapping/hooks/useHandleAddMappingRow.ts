import { useFormContext } from 'react-hook-form';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';
import { AdvancedMappingItem, AdvancedMappingRow } from '../types';

interface useHandleAddMappingRowProps {
    setAdvancedMappingRows: React.Dispatch<React.SetStateAction<AdvancedMappingRow[]>>;
    setAdvancedMapping: React.Dispatch<React.SetStateAction<AdvancedMappingItem[]>>;
    names: {
        [key: string]: FormNameObject;
    };
    advancedMapping: AdvancedMappingItem[];
}

export const useHandleAddMappingRow = ({
    setAdvancedMappingRows,
    setAdvancedMapping,
    names,
    advancedMapping,
}: useHandleAddMappingRowProps): { handleAddMappingRow: () => void } => {
    const { setValue, watch } = useFormContext();

    const advancedMappingFieldNameValue = watch(names.advancedMappingFieldName.name);

    const handleAddMappingRow = React.useCallback(() => {
        setAdvancedMapping(prev => {
            return prev.map(el => {
                if (el.value === advancedMappingFieldNameValue) {
                    return {
                        ...el,
                        isUsed: true,
                    };
                }

                return el;
            });
        });
        setAdvancedMappingRows(prev => {
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
        setValue(names.advancedMappingFieldName.name, '');
    }, [
        advancedMapping,
        advancedMappingFieldNameValue,
        names.advancedMappingFieldName.name,
        setAdvancedMapping,
        setAdvancedMappingRows,
        setValue,
    ]);

    return { handleAddMappingRow };
};
