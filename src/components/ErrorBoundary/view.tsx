import { Notistack, React } from '../../plugin.globals';
const { withSnackbar } = Notistack;

interface State {
    error: '';
}

interface Props {
    enqueueSnackbar: (errormessage: string, options: {}) => void;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        // @ts-ignore
        this.state = { error: '' };
    }

    componentDidCatch(error) {
        const errorMessage = `${error.name}: ${error.message}`;
        // @ts-ignore
        this.setState({ error: errorMessage });
        // @ts-ignore
        this.props.enqueueSnackbar(errorMessage, {
            autoHideDuration: 5000,
            variant: 'error',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
        });
    }

    render() {
        // @ts-ignore
        const { error } = this.state;
        if (error) {
            return (
                <>
                    <div>Ooops, something went wrong...</div>
                    <div>{error}</div>
                </>
            );
        } else {
            // @ts-ignore
            return <>{this.props.children}</>;
        }
    }
}

export default withSnackbar(ErrorBoundary);
