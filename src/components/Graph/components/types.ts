import { ElkExtendedEdge, ElkNode } from 'elkjs';

export interface MyNode extends ElkNode {
    id: string;
    status: string;
    title: string;
    height: number;
    width: number;
    url?: string;
}

export interface GraphProps {
    id: string;
    nodes: MyNode[];
    edges: ElkExtendedEdge[];
    type?: string;
    direction?: string;
}
