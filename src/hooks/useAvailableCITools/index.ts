import { CI_TOOLS } from '../../constants/ciTools';
import { React } from '../../plugin.globals';
import { useEDPComponents } from '../useEDPComponents';

interface UseAvailableCIToolsProps {
    namespace: string;
}

export const useAvailableCITools = ({
    namespace,
}: UseAvailableCIToolsProps): {
    availableCITools: string[];
    error: Error;
} => {
    const { EDPComponents, error } = useEDPComponents({ namespace });

    const availableCITools = React.useMemo(
        () =>
            Object.values(CI_TOOLS).reduce((acc, cur) => {
                if (EDPComponents.includes(cur)) {
                    acc.push(cur);
                }

                return acc;
            }, []),
        [EDPComponents]
    );

    return { availableCITools, error };
};
