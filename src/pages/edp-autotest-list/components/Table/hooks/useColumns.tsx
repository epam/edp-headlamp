import { CodebaseListRowActions } from '../../../../../components/CodebaseListRowActions';
import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { EDPCodebaseKubeObject } from '../../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { pluginLib, React } from '../../../../../plugin.globals';
import { AUTOTEST_ROUTE_NAME } from '../../../../../routes/names';
import { sortByName } from '../../../../../utils/sort/sortByName';
import { sortByStatus } from '../../../../../utils/sort/sortByStatus';

const {
    CommonComponents: { Link },
} = pluginLib;

export const useColumns = (): HeadlampSimpleTableGetterColumn<EDPCodebaseKubeObjectInterface>[] =>
    React.useMemo(() => {
        return [
            {
                label: 'Status',
                getter: ({ status: { status } }) => <StatusIcon status={status} />,
                sort: (a, b) => sortByStatus(a.status.status, b.status.status),
            },
            {
                label: 'Autotest',
                getter: data => {
                    const kubeObjectBasedOnData = new EDPCodebaseKubeObject(data);
                    return (
                        <Link to={kubeObjectBasedOnData.getDetailsLink(AUTOTEST_ROUTE_NAME)}>
                            {data.metadata.name}
                        </Link>
                    );
                },
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
                    <CodebaseListRowActions
                        kubeObject={EDPCodebaseKubeObject}
                        kubeObjectData={kubeObjectData}
                    />
                ),
            },
        ];
    }, []);
