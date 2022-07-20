import { FloatingActions } from '../../components/FloatingActions';
import { LibraryExample } from '../../configs/kube-examples/edp-library';
import { EDPCodebaseKubeObject, streamCodebasesByTypeLabel } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { pluginLib, React, ReactRouter } from '../../plugin.globals';
import { Table } from './components/Table';
import { EDPLibraryListProps } from './types';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;
const { useParams } = ReactRouter;

export const EDPLibraryList: React.FC<EDPLibraryListProps> = (): React.ReactElement => {
    const { namespace } = useParams();
    const [libraries, setLibraries] = React.useState<EDPCodebaseKubeObjectInterface[]>([]);
    const [, setError] = React.useState<string>('');

    React.useEffect(() => {
        const cancelStream = streamCodebasesByTypeLabel(
            EDPCodebaseKubeObjectConfig.types.library.name.singularForm,
            setLibraries,
            setError,
            namespace
        );

        return () => cancelStream();
    }, [namespace]);

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
