import { AutotestExample } from '../../configs/kube-examples/edp-autotest';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { filterCodebasesByType } from '../../k8s/EDPCodebase/utils/filterCodebasesByType';
import { FloatingActions } from './components/FloatingActions';
import { Table } from './components/Table';
import { EDPAutotestListProps } from './types';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;

const { SectionBox, SectionFilterHeader } = CommonComponents;

export const EDPAutotestList: React.FC<EDPAutotestListProps> = (): React.ReactElement => {
    const [autotests, setAutotests] = React.useState([]);

    React.useEffect(() => {
        EDPCodebaseKubeObject.getList(data => {
            const filteredAutotests = filterCodebasesByType(
                data,
                EDPCodebaseKubeObjectConfig.types.autotest.name.pluralForm
            );
            setAutotests(filteredAutotests);
        });
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
