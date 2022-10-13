import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface useDefaultValuesProps {
    names: { [key: string]: FormNameObject };
}

export const useDefaultValues = ({ names }: useDefaultValuesProps): { [key: string]: any } => {
    const baseDefaultValues = React.useMemo(() => {
        return {
            [names.sshPort.name]: 22,
            [names.httpsPort.name]: 443,
        };
    }, [names.httpsPort.name, names.sshPort.name]);

    return { baseDefaultValues };
};
