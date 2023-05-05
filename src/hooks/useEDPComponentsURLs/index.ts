import { useEDPComponentsQuery } from '../useEDPComponentsQuery';
import { UseEDPComponentsURLSProps, UseEDPComponentsURLSReturnType } from './types';

export const useEDPComponentsURLs = ({
    namespace,
}: UseEDPComponentsURLSProps): UseEDPComponentsURLSReturnType => {
    const { data } = useEDPComponentsQuery({ namespace });

    if (!data) {
        return {};
    }

    return data.items.reduce((acc, cur) => {
        acc[cur.spec.type] = cur.spec.url;
        return acc;
    }, {});
};
