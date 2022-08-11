import { LibraryList } from '../../components/LibraryList';
import { streamCodebasesByTypeLabel } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { pluginLib, React, ReactRouter } from '../../plugin.globals';
import { FloatingActions } from './components/FloatingActions';
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
            <FloatingActions />
            <LibraryList data={libraries} />
        </SectionBox>
    );
};
