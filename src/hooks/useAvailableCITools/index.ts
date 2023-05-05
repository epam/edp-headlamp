import { CI_TOOLS } from '../../constants/ciTools';
import { React } from '../../plugin.globals';
import { useEDPComponentsQuery } from '../useEDPComponentsQuery';
import { UseAvailableCIToolsProps, UseAvailableCIToolsReturnType } from './types';

export const useAvailableCITools = ({
    namespace,
}: UseAvailableCIToolsProps): UseAvailableCIToolsReturnType => {
    const { data } = useEDPComponentsQuery({ namespace });

    const EDPComponentsNames = React.useMemo(() => data?.items?.map(el => el.spec.type), [data]);

    const availableCITools = React.useMemo(
        () =>
            Object.values(CI_TOOLS).reduce((acc, cur) => {
                if (Array.isArray(EDPComponentsNames) && EDPComponentsNames.includes(cur)) {
                    acc.push(cur);
                }

                return acc;
            }, []),
        [EDPComponentsNames]
    );

    return { availableCITools };
};
