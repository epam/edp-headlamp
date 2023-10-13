import { ElkExtendedEdge, ElkNode } from 'elkjs';

export interface MyNode<T = unknown> extends ElkNode {
    data: T;
    color: string;
}

export interface GraphProps {
    id: string;
    nodes: ElkNode[];
    edges: ElkExtendedEdge[];
    type?: string;
    direction?: string;
    renderEdge: (edge: ElkExtendedEdge) => JSX.Element;
    renderNode: (node: ElkNode) => JSX.Element;
}
