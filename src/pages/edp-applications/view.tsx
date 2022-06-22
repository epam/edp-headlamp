import { ApplicationExample } from '../../configs/kube-examples/edp-application';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { filterCodebasesByType } from '../../k8s/EDPCodebase/utils/filterCodebasesByType';
import { FloatingActions } from './components/FloatingActions';
import { Table } from './components/Table';
import { EDPCodebasesProps } from './types';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;

const { SectionBox, SectionFilterHeader } = CommonComponents;

export const EDPApplications: React.FC<EDPCodebasesProps> = (): React.ReactElement => {
    const [applications, setApplications] = React.useState([]);

    React.useEffect(() => {
        EDPCodebaseKubeObject.getList(data => {
            const filteredApplications = filterCodebasesByType(
                data,
                EDPCodebaseKubeObjectConfig.types.application.name.singularForm
            );
            setApplications(filteredApplications);
        });
    }, []);

    return (
        <SectionBox title={<SectionFilterHeader title="Applications" headerStyle="main" />}>
            <FloatingActions
                kubeObject={EDPCodebaseKubeObject}
                kubeObjectExample={ApplicationExample}
            />
            <Table data={applications} />
        </SectionBox>
    );
};
