import { CreateCodebase } from '../../components/CreateCodebase';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { LibraryList } from '../../components/LibraryList';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { useNamespace } from '../../hooks/useNamespace';
import { streamCodebasesByTypeLabel } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { pluginLib, React } from '../../plugin.globals';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;

export const EDPLibraryList = (): React.ReactElement => {
    const { namespace } = useNamespace();

    const [libraries, setLibraries] = React.useState<EDPCodebaseKubeObjectInterface[]>([]);
    const [, setError] = React.useState<Error>(null);

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
        <SectionBox
            title={<SectionFilterHeader title="Libraries" headerStyle="label" noNamespaceFilter />}
        >
            <CreateKubeObject>
                <CreateCodebase type={CODEBASE_TYPES['LIBRARY']} />
            </CreateKubeObject>
            <LibraryList data={libraries} />
        </SectionBox>
    );
};
