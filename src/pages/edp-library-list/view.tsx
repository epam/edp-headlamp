import LeakyBucket from 'leaky-bucket';
import { useInterval } from 'react-use';
import { LibraryExample } from '../../configs/kube-examples/edp-library';
import { REFETCH_DELAY } from '../../constants/delays';
import { EDPCodebaseKubeObject } from '../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { FloatingActions } from './components/FloatingActions';
import { Table } from './components/Table';
import { EDPLibraryListProps } from './types';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;
const { SectionBox, SectionFilterHeader } = CommonComponents;

export const EDPLibraryList: React.FC<EDPLibraryListProps> = (): React.ReactElement => {
    const [libraries, setLibraries] = React.useState<EDPCodebaseKubeObjectInterface[]>([]);
    const reqErrorCost = 1;
    const reqErrorsBucket = new LeakyBucket({
        capacity: 10,
    });

    const updateLibraries = React.useCallback(async () => {
        try {
            const { items } = await EDPCodebaseKubeObject.getCodebasesByTypeLabel(
                EDPCodebaseKubeObjectConfig.types.library.name.singularForm
            );

            setLibraries(items);
        } catch (err: any) {
            reqErrorsBucket.pay(reqErrorCost);
            const { message } = err;
            const { status } = JSON.parse(JSON.stringify(err));
            throw new Error(`${message}. Status: ${status}`);
        }
    }, [EDPCodebaseKubeObject, setLibraries]);

    React.useEffect(() => {
        updateLibraries().catch(console.error);
    }, []);

    useInterval(updateLibraries, REFETCH_DELAY);

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
