import { ElkExtendedEdge, ElkNode } from 'elkjs';

export interface MyNode<T = unknown> extends ElkNode {
  data: T;
  color: string;
}

export interface MyEdge {
  id: string;
  source: string;
  color: string;
  target: string;
  noArrow?: boolean;
}

export interface GraphProps {
  id: string;
  nodes: MyNode[];
  edges: MyEdge[];
  type?: string;
  direction?: string;
  renderEdge: (edge: ElkExtendedEdge) => JSX.Element;
  renderNode: (...args: any) => React.JSX.Element;
}
