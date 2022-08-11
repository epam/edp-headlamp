import { AutotestList } from '../../components/AutotestList';
import { streamCodebasesByTypeLabel } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { pluginLib, React, ReactRouter } from '../../plugin.globals';
import { FloatingActions } from './components/FloatingActions';
import { EDPAutotestListProps } from './types';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;
const { useParams } = ReactRouter;

export const EDPAutotestList: React.FC<EDPAutotestListProps> = (): React.ReactElement => {
    const { namespace } = useParams();
    const [autotests, setAutotests] = React.useState<EDPCodebaseKubeObjectInterface[]>([]);
    const [, setError] = React.useState<string>('');

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
        <SectionBox title={<SectionFilterHeader title="Autotests" headerStyle="main" />}>
            <FloatingActions />
            <AutotestList autotests={autotests} />
        </SectionBox>
    );
};
