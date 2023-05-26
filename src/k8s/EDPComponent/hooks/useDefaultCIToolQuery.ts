import { CI_TOOLS } from '../../../constants/ciTools';
import { useEDPComponentsQuery } from './useEDPComponentsQuery';

export const useDefaultCIToolQuery = () => {
    return useEDPComponentsQuery<string>({
        options: {
            select: data => {
                const EDPComponentsNames = data.items.map(el => el.spec.type);

                if (EDPComponentsNames.includes(CI_TOOLS.TEKTON)) {
                    return CI_TOOLS.TEKTON;
                }

                if (EDPComponentsNames.includes(CI_TOOLS.JENKINS)) {
                    return CI_TOOLS.JENKINS;
                }
            },
        },
    });
};
