import { ValueOf } from '../../../../types/global';
import { SYSTEM_EDP_COMPONENTS } from '../../constants';
import { EDPComponentKubeObjectInterface } from '../../types';

type allowedType = ValueOf<typeof SYSTEM_EDP_COMPONENTS> & string;

export const isSystemEDPComponent = (component: EDPComponentKubeObjectInterface) => {
    const allowedTypes: Array<allowedType> = Object.values(SYSTEM_EDP_COMPONENTS);
    return allowedTypes.includes(component.spec.type as allowedType);
};
