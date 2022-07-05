import { LibraryExample } from '../../configs/kube-examples/edp-library';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { FloatingActions } from './components/FloatingActions';
import { Table } from './components/Table';
import { EDPLibraryListProps } from './types';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;
const { SectionBox, SectionFilterHeader } = CommonComponents;

export const EDPLibraryList: React.FC<EDPLibraryListProps> = (): React.ReactElement => {
    const [libraries, setLibraries] = React.useState([]);

    React.useEffect(() => {
        EDPCodebaseKubeObject.getCodebasesByTypeLabel(
            EDPCodebaseKubeObjectConfig.types.library.name.singularForm,
            ({ items }) => setLibraries(items)
        );
    }, []);

    return (
        <SectionBox title={<SectionFilterHeader title="Libraries" headerStyle="main" />}>
            <FloatingActions
                kubeObject={EDPCodebaseKubeObject}
                kubeObjectExample={LibraryExample}
            />
            <Table data={libraries} />
        </SectionBox>
    );
};
