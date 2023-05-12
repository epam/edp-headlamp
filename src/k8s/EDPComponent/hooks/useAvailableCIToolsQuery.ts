import { CI_TOOLS } from '../../../constants/ciTools';
import { useEDPComponentsQuery } from './useEDPComponentsQuery';

export const useAvailableCIToolsQuery = () => {
    return useEDPComponentsQuery<string[]>({
        select: data => {
            const EDPComponentsNames = data.items.map(el => el.spec.type);

            return Object.values(CI_TOOLS).reduce((acc, cur) => {
                if (Array.isArray(EDPComponentsNames) && EDPComponentsNames.includes(cur)) {
                    acc.push(cur);
                }

                return acc;
            }, []);
        },
    });
};
