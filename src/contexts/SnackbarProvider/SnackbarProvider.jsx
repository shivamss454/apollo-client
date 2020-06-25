import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const MyContext = React.createContext();

export default class SnackbarProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      status: '',
      open: false,
    };
  }

  handleOpenSnackbar = (message, status) => {
    this.setState({
      message,
      status,
      open: true,
    });
  }

  handleCloseSnackbar = (message) => {
    this.setState({ message, open: false });
  }

  render() {
    const { children } = this.props;
    const { open, message, status } = this.state;

    return (
      <>
        <MyContext.Provider
          value={{
            state: { open, message, status },
            opensnackbar: this.handleOpenSnackbar,
            closedsnackbar: this.handleCloseSnackbar,
          }}
        >
          {children}
          <CustomizedSnackbars />
        </MyContext.Provider>
      </>
    );
  }
}

function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function CustomizedSnackbars() {
  const data = React.useContext(MyContext);
  const { state, closedsnackbar } = data;
  const { open, message, status } = state;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closedsnackbar();
  };
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {status === 'success' ? (
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        ) : <Alert onClose={handleClose} severity="error">{message}</Alert>}
      </Snackbar>
    </div>
  );
}
SnackbarProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export { MyContext };
