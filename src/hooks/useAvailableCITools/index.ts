import { CI_TOOLS } from '../../constants/ciTools';
import { React } from '../../plugin.globals';
import { useEDPComponentsNames } from '../useEDPComponentsNames';

export const useAvailableCITools = (): string[] => {
    const EDPComponentsNames = useEDPComponentsNames();

    return React.useMemo(
        () =>
            Object.values(CI_TOOLS).reduce((acc, cur) => {
                if (Array.isArray(EDPComponentsNames) && EDPComponentsNames.includes(cur)) {
                    acc.push(cur);
                }

                return acc;
            }, []),
        [EDPComponentsNames]
    );
};
