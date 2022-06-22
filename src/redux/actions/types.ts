import { OptionsObject as SnackbarProps } from 'notistack';

export interface CallbackAction extends CallbackActionOptions {
    callback: (...args: any[]) => void;
}

export interface CallbackActionOptions {
    startUrl?: string;
    cancelUrl?: string;
    errorUrl?: string;
    successUrl?: string;
    startMessage?: string;
    cancelledMessage?: string;
    errorMessage?: string;
    successMessage?: string;
    startOptions?: SnackbarProps;
    cancelledOptions?: SnackbarProps;
    successOptions?: SnackbarProps;
    errorOptions?: SnackbarProps;
}
