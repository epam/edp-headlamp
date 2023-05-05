import { useQuery } from 'react-query';
import { Notistack } from '../../plugin.globals';
import { KubeObjectListInterface } from '../../types/k8s';
import { useNamespace } from '../useNamespace';
import { UseResourceListQueryProps, UseResourceListQueryReturnType } from './types';

const { useSnackbar } = Notistack;

export const useResourceListQuery = <Resource>({
    queryKey,
    queryFn,
    options,
}: UseResourceListQueryProps<Resource>): UseResourceListQueryReturnType<Resource> => {
    const { enqueueSnackbar } = useSnackbar();
    const { namespace } = useNamespace();

    const query = useQuery<KubeObjectListInterface<Resource>, Error>(
        queryKey,
        () => queryFn(namespace),
        options
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
