import { React } from '../../../../../../plugin.globals';

export interface TabPanelProps extends React {
    children?: React.ReactNode;
    index: any;
    value: any;
    className: string;
}
