import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { SecretKubeObjectInterface } from '../../../../../k8s/Secret/types';
import { React } from '../../../../../plugin.globals';

export const useColumns = (): HeadlampSimpleTableGetterColumn<SecretKubeObjectInterface>[] => {
    return React.useMemo(
        () => [
            {
                label: 'Name',
                getter: ({ data: { name } }) => atob(unescape(name)),
            },
            {
                label: 'Host',
                getter: ({ data: { server } }) => atob(unescape(server)),
            },
        ],
        []
    );
};
