import { CreateCodebase } from '../../components/CreateCodebase';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { LibraryList } from '../../components/LibraryList';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { streamCodebasesByTypeLabel } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { pluginLib, React, ReactRouter } from '../../plugin.globals';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;
const { useParams } = ReactRouter;

export const EDPLibraryList = (): React.ReactElement => {
    const { namespace } = useParams();
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
        <SectionBox title={<SectionFilterHeader title="Libraries" headerStyle="main" />}>
            <CreateKubeObject>
                <CreateCodebase type={CODEBASE_TYPES['AUTOTEST']} />
            </CreateKubeObject>
            <LibraryList data={libraries} />
        </SectionBox>
    );
};
