import { React } from '../../plugin.globals';
import { RenderProps } from './types';

export const Render = ({ condition, children }: RenderProps): React.ReactElement => {
    return condition ? children : null;
};
