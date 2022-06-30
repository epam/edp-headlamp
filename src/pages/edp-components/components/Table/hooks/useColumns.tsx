import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { EDPComponentKubeObjectInterface } from '../../../../../k8s/EDPComponent/types';

const {
    pluginLib: { React, MuiCore },
} = globalThis;
const { Link } = MuiCore;

export const useColumns = (classes: {
    [key: string]: any;
}): HeadlampSimpleTableGetterColumn<EDPComponentKubeObjectInterface>[] =>
    React.useMemo(
        () => [
            {
                label: 'Icon',
                getter: ({ spec: { icon, url } }) => (
                    <Link href={url} target="_blank" rel="noopener">
                        <span className={classes.serviceItemIcon}>
                            <img src={`data:image/svg+xml;base64,${icon}`} alt="" />
                        </span>
                    </Link>
                ),
            },
            {
                label: 'Name',
                getter: ({ spec: { url, type } }) => (
                    <Link href={url} target="_blank" rel="noopener">
                        {type}
                    </Link>
                ),
            },
            {
                label: 'Namespace',
                getter: ({ metadata: { namespace } }) => <>{namespace}</>,
            },
        ],
        [classes]
    );
