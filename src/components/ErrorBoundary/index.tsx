import { OptionsObject, SnackbarKey, SnackbarMessage, withSnackbar } from 'notistack';
import * as React from 'react';
import { Snackbar } from '../Snackbar';

interface State {
  error: string;
}

interface Props {
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
  closeSnackbar: (key?: SnackbarKey) => void;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: '' };
  }

  componentDidCatch(error: Error) {
    const errorMessage = `${error.name}: ${error.message}`;
    this.setState({ error: errorMessage });
    this.props.enqueueSnackbar(errorMessage, {
      autoHideDuration: 5000,
      content: (key, message) => (
        <Snackbar
          snackbarKey={key}
          text={String(message)}
          handleClose={() => this.props.closeSnackbar(key)}
          variant="error"
        />
      ),
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <>
          <div>Ooops, something went wrong...</div>
          <div>{error}</div>
        </>
      );
    } else {
      return <>{this.props.children}</>;
    }
  }
}

export default withSnackbar(ErrorBoundary);
