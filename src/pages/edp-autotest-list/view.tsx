import { AutotestList } from '../../components/AutotestList';
import { CreateCodebase } from '../../components/CreateCodebase';
import { CreateKubeObject } from '../../components/CreateKubeObject';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { streamCodebasesByTypeLabel } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { pluginLib, React, ReactRouter } from '../../plugin.globals';

const {
    CommonComponents: { SectionBox, SectionFilterHeader },
} = pluginLib;
const { useParams } = ReactRouter;

export const EDPAutotestList = (): React.ReactElement => {
    const { namespace } = useParams();
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
        <SectionBox title={<SectionFilterHeader title="Autotests" headerStyle="label" />}>
            <CreateKubeObject>
                <CreateCodebase type={CODEBASE_TYPES['AUTOTEST']} />
            </CreateKubeObject>
            <AutotestList autotests={autotests} />
        </SectionBox>
    );
};
