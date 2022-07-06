import { AutotestExample } from '../../configs/kube-examples/edp-autotest';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { FloatingActions } from './components/FloatingActions';
import { Table } from './components/Table';
import { EDPAutotestListProps } from './types';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;

const { SectionBox, SectionFilterHeader } = CommonComponents;

export const EDPAutotestList: React.FC<EDPAutotestListProps> = (): React.ReactElement => {
    const [autotests, setAutotests] = React.useState<EDPCodebaseKubeObjectInterface[]>([]);

    React.useEffect(() => {
        EDPCodebaseKubeObject.getCodebasesByTypeLabel(
            EDPCodebaseKubeObjectConfig.types.autotest.name.pluralForm,
            ({ items }) => setAutotests(items)
        );
    }, []);

    return (
        <SectionBox title={<SectionFilterHeader title="Autotests" headerStyle="main" />}>
            <FloatingActions
                kubeObject={EDPCodebaseKubeObject}
                kubeObjectExample={AutotestExample}
            />
            <Table data={autotests} />
        </SectionBox>
    );
};
