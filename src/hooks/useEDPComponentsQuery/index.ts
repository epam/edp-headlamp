import { useQuery } from 'react-query';
import { EDPComponentKubeObject } from '../../k8s/EDPComponent';
import { REQUEST_KEY_QUERY_EDP_COMPONENTS } from '../../k8s/EDPComponent/requestKeys';
import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { Notistack } from '../../plugin.globals';
import { KubeObjectListInterface } from '../../types/k8s';
import { UseEDPComponentsQueryProps, UseEDPComponentsQueryReturnType } from './types';

const { useSnackbar } = Notistack;

export const useEDPComponentsQuery = ({
    namespace,
}: UseEDPComponentsQueryProps): UseEDPComponentsQueryReturnType => {
    const { enqueueSnackbar } = useSnackbar();

    const query = useQuery<KubeObjectListInterface<EDPComponentKubeObjectInterface>, Error>(
        REQUEST_KEY_QUERY_EDP_COMPONENTS,
        () => EDPComponentKubeObject.getList(namespace),
        {
            staleTime: Infinity,
        }
    );

    if (query.error) {
        enqueueSnackbar(query.error, {
            autoHideDuration: 5000,
            variant: 'error',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
        });
    }

    return query;
};
