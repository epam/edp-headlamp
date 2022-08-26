import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface useDefaultValuesProps {
    names: { [key: string]: FormNameObject };
}

export const useDefaultValues = ({ names }: useDefaultValuesProps): { [key: string]: any } => {
    const baseDefaultValues = React.useMemo(() => {
        return {
            [names.fromCommit.name]: '',
            [names.release.name]: false,
        };
    }, [names.fromCommit.name, names.release.name]);

    return { baseDefaultValues };
};
