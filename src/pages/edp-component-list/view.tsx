import { EDPComponentKubeObject } from '../../k8s/EDPComponent';
import { rem } from '../../utils/styling/rem';
import { Table } from './components/Table';
import { EDPComponentListProps } from './types';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;
const { SectionBox, SectionFilterHeader } = CommonComponents;

export const EDPComponentList: React.FC<EDPComponentListProps> = (): React.ReactElement => {
    const [components] = EDPComponentKubeObject.useList();

    return (
        <SectionBox
            title={<SectionFilterHeader title="Overview" headerStyle="main" />}
            sx={{ paddingTop: rem(20) }}
        >
            <Table data={components} />
        </SectionBox>
    );
};
