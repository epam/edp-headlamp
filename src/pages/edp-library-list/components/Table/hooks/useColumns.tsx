import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../components/StatusIcon/view';
import { EDPCodebaseKubeObject } from '../../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { LIBRARY_ROUTE_NAME } from '../../../../../routes/names';
import { sortByName } from '../../../../../utils/sort/sortByName';
import { sortByStatus } from '../../../../../utils/sort/sortByStatus';
import { RowActions } from '../components/RowActions';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;
const { Link } = CommonComponents;

export const useColumns = (): HeadlampSimpleTableGetterColumn<EDPCodebaseKubeObjectInterface>[] =>
    React.useMemo(() => {
        return [
            {
                label: 'Status',
                getter: ({ status: { status } }) => <StatusIcon status={status} />,
                sort: (a, b) => sortByStatus(a.status.status, b.status.status),
            },
            {
                label: 'Library',
                getter: data => (
                    <Link to={new EDPCodebaseKubeObject(data).getDetailsLink(LIBRARY_ROUTE_NAME)}>
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
                    <RowActions
                        kubeObject={EDPCodebaseKubeObject}
                        kubeObjectData={kubeObjectData}
                    />
                ),
            },
        ];
    }, []);
