import { CI_TOOLS } from '../../constants/ciTools';
import { useEDPComponents } from '../useEDPComponents';

export const useAvailableCITools = ({ namespace }) => {
    const { EDPComponents, error } = useEDPComponents({ namespace });
    const availableCITools = Object.values(CI_TOOLS).reduce((acc, cur) => {
        if (EDPComponents.includes(cur)) {
            acc.push(cur);
        }

        return acc;
    }, []);

    return { availableCITools, error };
};
