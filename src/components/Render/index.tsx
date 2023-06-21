import { RenderProps } from './types';

export const Render = ({ condition, children }: RenderProps) => {
    return condition ? children : null;
};
