import { ApplicationExample } from '../../configs/kube-examples/edp-application';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { FloatingActions } from './components/FloatingActions';
import { Table } from './components/Table';
import { EDPApplicationListProps } from './types';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;

const { SectionBox, SectionFilterHeader } = CommonComponents;

export const EDPApplicationList: React.FC<EDPApplicationListProps> = (): React.ReactElement => {
    const [applications, setApplications] = React.useState<EDPCodebaseKubeObjectInterface[]>([]);

    React.useEffect(() => {
        EDPCodebaseKubeObject.getCodebasesByTypeLabel(
            EDPCodebaseKubeObjectConfig.types.application.name.singularForm,
            ({ items }) => setApplications(items)
        );
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
