import { ElkExtendedEdge, ElkNode } from 'elkjs';

export interface MyNode extends ElkNode {
    id: string;
    color: string;
    icon: string;
    status: string;
    isRotating: boolean;
    title: string;
    height: number;
    width: number;
    url?: string;
}

export interface MyEdge extends ElkExtendedEdge {
    color: string;
}

export interface GraphProps {
    id: string;
    nodes: MyNode[];
    edges: MyEdge[];
    type?: string;
    direction?: string;
}
