import { CreateCodebase } from '../../components/CreateCodebase';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { useNamespace } from '../../hooks/useNamespace';
import { streamCodebasesByTypeLabel } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { pluginLib, React } from '../../plugin.globals';
import { AutotestList } from './AutotestList';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;

export const EDPAutotestList = (): React.ReactElement => {
    const { namespace } = useNamespace();

    const [autotests, setAutotests] = React.useState<EDPCodebaseKubeObjectInterface[]>([]);
    const [, setError] = React.useState<Error>(null);

    React.useEffect(() => {
        const cancelStream = streamCodebasesByTypeLabel(
            EDPCodebaseKubeObjectConfig.types.autotest.name.pluralForm,
            setAutotests,
            setError,
            namespace
        );

        return () => cancelStream();
    }, [namespace]);

    return (
        <SectionBox
            title={<SectionFilterHeader title="Autotests" headerStyle="label" noNamespaceFilter />}
        >
            <CreateKubeObject>
                <CreateCodebase type={CODEBASE_TYPES['AUTOTEST']} />
            </CreateKubeObject>
            <AutotestList autotests={autotests} />
        </SectionBox>
    );
};
