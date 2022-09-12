import { STATUS_UNKNOWN } from '../../../constants/statuses';
import { EDPCodebaseKubeObject } from '../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { pluginLib, React } from '../../../plugin.globals';
import { LIBRARY_ROUTE_NAME } from '../../../routes/names';
import { sortByName } from '../../../utils/sort/sortByName';
import { sortByStatus } from '../../../utils/sort/sortByStatus';
import { CodebaseActions } from '../../CodebaseActions';
import { HeadlampSimpleTableGetterColumn } from '../../HeadlampSimpleTable/types';
import { StatusIcon } from '../../StatusIcon';

const {
    CommonComponents: { Link },
} = pluginLib;

export const useColumns = (): HeadlampSimpleTableGetterColumn<EDPCodebaseKubeObjectInterface>[] =>
    React.useMemo(() => {
        return [
            {
                label: 'Status',
                getter: ({ status }) => (
                    <StatusIcon status={status ? status.status : STATUS_UNKNOWN} />
                ),
                sort: (a, b) => sortByStatus(a.status.status, b.status.status),
            },
            {
                label: 'Library',
                getter: data => (
                    <Link
                        to={new EDPCodebaseKubeObject(data).getDetailsLink(LIBRARY_ROUTE_NAME)}
                        kubeObject={null}
                        routeName={null}
                    >
                        {data.metadata.name}
                    </Link>
                ),
                sort: (a, b) => sortByName(a.metadata.name, b.metadata.name),
            },
            {
                label: 'Language',
                getter: ({ spec: { lang } }) => lang,
                sort: (a, b) => sortByName(a.spec.lang, b.spec.lang),
            },
            {
                label: 'Build Tool',
                getter: ({ spec: { buildTool } }) => buildTool,
                sort: (a, b) => sortByName(a.spec.buildTool, b.spec.buildTool),
            },
            {
                label: 'Framework',
                getter: ({ spec: { framework } }) => framework,
                sort: (a, b) => sortByName(a.spec.framework, b.spec.framework),
            },
            {
                label: 'CI Tool',
                getter: ({ spec: { ciTool } }) => ciTool,
                sort: (a, b) => sortByName(a.spec.ciTool, b.spec.ciTool),
            },
            {
                label: '',
                getter: kubeObjectData => (
                    <CodebaseActions
                        kubeObject={EDPCodebaseKubeObject}
                        kubeObjectData={kubeObjectData}
                    />
                ),
            },
        ];
    }, []);
