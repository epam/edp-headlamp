import { RenderProps } from './types';

export const Render: React.FC<RenderProps> = ({ condition, children }): React.ReactElement => {
    return condition ? children : null;
};
