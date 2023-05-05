import { EDPComponentKubeObject } from '../../k8s/EDPComponent';
import { REQUEST_KEY_QUERY_EDP_COMPONENTS } from '../../k8s/EDPComponent/requestKeys';
import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { React } from '../../plugin.globals';
import { useResourceListQuery } from '../useResourceListQuery';

export const useEDPComponentsNames = (): string[] => {
    const [EDPComponentNames, setEDPComponentNames] = React.useState<string[]>([]);

    useResourceListQuery<EDPComponentKubeObjectInterface>({
        queryKey: REQUEST_KEY_QUERY_EDP_COMPONENTS,
        queryFn: EDPComponentKubeObject.getList,
        options: {
            onSuccess: data => {
                const EDPComponentURLS = data?.items?.map(el => el.spec.type);
                setEDPComponentNames(EDPComponentURLS);
            },
        },
    });

    return EDPComponentNames;
};
