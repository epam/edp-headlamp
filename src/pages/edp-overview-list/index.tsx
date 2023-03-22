import { EDPComponentKubeObject } from '../../k8s/EDPComponent';
import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { pluginLib, React } from '../../plugin.globals';
import { rem } from '../../utils/styling/rem';
import { EDPComponentList } from './components/EDPComponentList';

const { CommonComponents } = pluginLib;
const { SectionBox, SectionFilterHeader } = CommonComponents;

export const EDPOverviewList = (): React.ReactElement => {
    const [EDPComponents, setEDPComponents] = React.useState<EDPComponentKubeObjectInterface[]>([]);
    const [error, setError] = React.useState<unknown>(null);

    EDPComponentKubeObject.useApiList(
        (components: EDPComponentKubeObjectInterface[]) => {
            setEDPComponents(components.filter(el => el.spec.visible));
        },
        error => setError(error)
    );

    return (
        <SectionBox
            title={<SectionFilterHeader title="Overview" headerStyle="label" />}
            sx={{ paddingTop: rem(20) }}
        >
            <EDPComponentList EDPComponents={EDPComponents} error={error} />
        </SectionBox>
    );
};
