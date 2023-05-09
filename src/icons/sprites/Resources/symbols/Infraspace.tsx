import { React } from '../../../../plugin.globals';
import { RESOURCE_ICON_NAMES } from '../names';

export const Infraspace = (): React.ReactElement => {
    return (
        <symbol id={RESOURCE_ICON_NAMES.INFRASPACE} viewBox="0 0 24 24" xmlSpace="preserve">
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 18.004H6.657C4.085 18 2 15.993 2 13.517c0-2.475 2.085-4.482 4.657-4.482c.393-1.762 1.794-3.2 3.675-3.773c1.88-.572 3.956-.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99a3.468 3.468 0 0 1 3.307 2.444M20 21l2-2l-2-2m-3 0l-2 2l2 2"
            />
        </symbol>
    );
};
