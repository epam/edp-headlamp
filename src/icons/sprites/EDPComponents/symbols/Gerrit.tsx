import { React } from '../../../../plugin.globals';

export const Gerrit = (): React.ReactElement => {
    return (
        <symbol id="gerrit" viewBox="12 7 27 27">
            <g fill="none" fillRule="nonzero" transform="translate(12 7)">
                <rect width={21} height={21} fill="#FAA" rx={4} />
                <rect width={21} height={21} x={6} y={6} fill="#AFA" rx={4} />
                <path fill="red" d="M9 12h6v2H9zM18 12h6v2h-6z" />
                <path
                    fill="green"
                    d="M9 18h2v-2h2v2h2v2h-2v2h-2v-2H9zM18 18h2v-2h2v2h2v2h-2v2h-2v-2h-2z"
                />
            </g>
        </symbol>
    );
};
