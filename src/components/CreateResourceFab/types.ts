import { MODAL_MAPPING } from '../../providers/Dialog/mapping';

export interface CreateResourceFabProps {
    modalName: keyof typeof MODAL_MAPPING;
    forwardedProps?: unknown;
}
