import { ElkExtendedEdge } from 'elkjs';

export interface EdgeProps extends ElkExtendedEdge {
    direction?: string;
    status?: string;
}
