import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../components/StatusIcon/view';
import { EDPCodebaseKubeObject } from '../../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { APPLICATION_ROUTE_NAME } from '../../../../../routes/names';
import { RowActions } from '../components/RowActions';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;
const { Link } = CommonComponents;

export const useColumns = (): HeadlampSimpleTableGetterColumn<EDPCodebaseKubeObjectInterface>[] =>
    React.useMemo(
        () => [
            {
                label: 'Status',
                getter: ({ status: { status } }) => <StatusIcon status={status} />,
            },
            {
                label: 'Application',
                getter: data => {
                    const kubeObjectBasedOnData = new EDPCodebaseKubeObject(data);
                    return (
                        <Link to={kubeObjectBasedOnData.getDetailsLink(APPLICATION_ROUTE_NAME)}>
                            {data.metadata.name}
                        </Link>
                    );
                },
            },
            {
                label: 'Language',
                getter: ({ spec: { lang } }) => lang,
            },
            {
                label: 'Build Tool',
                getter: ({ spec: { buildTool } }) => buildTool,
            },
            {
                label: 'Framework',
                getter: ({ spec: { framework } }) => framework,
            },
            {
                label: 'CI Tool',
                getter: ({ spec: { ciTool } }) => ciTool,
            },
            {
                label: '',
                getter: kubeObject => (
                    <RowActions kubeObject={EDPCodebaseKubeObject} kubeObjectData={kubeObject} />
                ),
            },
        ],
        []
    );
