import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface UseUpdateVersioningFieldsProps {
    watch: (name: string) => string;
    names: { [key: string]: FormNameObject };
    setValue: (name: string, value: any) => void;
}

export const useUpdateVersioningFields = ({
    watch,
    names,
    setValue,
}: UseUpdateVersioningFieldsProps): void => {
    const versioningStartFromFieldValue = watch(names.versioningStartFrom.name);

    React.useEffect(() => {
        if (versioningStartFromFieldValue) {
            const [version, snapshot] = versioningStartFromFieldValue.split('-');
            setValue(names.versioningStartFromVersion.name, version);
            setValue(names.versioningStartFromSnapshot.name, snapshot);
        }
    }, [
        names.versioningStartFromSnapshot.name,
        names.versioningStartFromVersion.name,
        setValue,
        versioningStartFromFieldValue,
    ]);
};
