import { LibraryExample } from '../../configs/kube-examples/edp-library';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { filterCodebasesByType } from '../../k8s/EDPCodebase/utils/filterCodebasesByType';
import { FloatingActions } from './components/FloatingActions';
import { Table } from './components/Table';
import { EDPLibrariesProps } from './types';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;
const { SectionBox, SectionFilterHeader } = CommonComponents;

export const EDPLibraries: React.FC<EDPLibrariesProps> = (): React.ReactElement => {
    const [libraries, setLibraries] = React.useState([]);

    React.useEffect(() => {
        EDPCodebaseKubeObject.getList(data => {
            const filteredLibraries = filterCodebasesByType(
                data,
                EDPCodebaseKubeObjectConfig.types.library.name.singularForm
            );
            setLibraries(filteredLibraries);
        });
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
