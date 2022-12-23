import ComponentFilterHeader from '../../components/ComponentFilterHeader';
import { CreateCodebase } from '../../components/CreateCodebase';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { useNamespace } from '../../hooks/useNamespace';
import { streamCodebasesByTypeLabel } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { pluginLib, React } from '../../plugin.globals';
import { ComponentList } from './components/ComponentList';

const {
    CommonComponents: { SectionBox },
} = pluginLib;

export const EDPComponentList = (): React.ReactElement => {
    const { namespace } = useNamespace();
    const [components, setComponents] = React.useState<EDPCodebaseKubeObjectInterface[]>([]);
    const [, setError] = React.useState<Error>(null);
    const [type, setType] = React.useState<CODEBASE_TYPES>(CODEBASE_TYPES['APPLICATION']);

    const handleStoreComponents = React.useCallback(
        (components: EDPCodebaseKubeObjectInterface[]) => {
            setComponents(components);
        },
        []
    );

    const handleError = React.useCallback((error: Error) => {
        setError(error);
    }, []);

    React.useEffect(() => {
        const cancelStream = streamCodebasesByTypeLabel(
            type,
            handleStoreComponents,
            handleError,
            namespace
        );

        return () => cancelStream();
    }, [handleError, handleStoreComponents, namespace, type]);

    return (
        <>
            <SectionBox title={<ComponentFilterHeader setType={setType} />}>
                <CreateKubeObject>
                    <CreateCodebase />
                </CreateKubeObject>
                <ComponentList components={components} />
            </SectionBox>
        </>
    );
};
