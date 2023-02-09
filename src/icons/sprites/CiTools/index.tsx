import { React } from '../../../plugin.globals';
import { Jenkins, Tekton } from './symbols';

export const CiTools = (): React.ReactElement => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            display={'none'}
        >
            <Jenkins />
            <Tekton />
        </svg>
    );
};
