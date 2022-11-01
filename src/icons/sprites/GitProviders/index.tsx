import { React } from '../../../plugin.globals';
import { Gerrit, Github, Gitlab } from './symbols';

export const GitProviders = (): React.ReactElement => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            display={'none'}
        >
            <Gerrit />
            <Gitlab />
            <Github />
        </svg>
    );
};
