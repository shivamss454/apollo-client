import React from 'react';
import PropTypes from 'prop-types';
import {
  DialogActions, DialogContent, DialogContentText, Button,
  Dialog, CircularProgress, DialogTitle, withStyles,
} from '@material-ui/core';

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});
class RemoveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      loading: false,
    };
  }

  render() {
    const {
      open, onClose, classes, data, onSubmit, loading
    } = this.props;
    const { originalId } = data;
    return (
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" className={classes.root} fullWidth>
          <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you really want to remove the trainee?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
                  <Button
                    onClick={() => {
                      onSubmit(originalId);
                    }}
                    color="primary"
                  >
                    {loading && (<CircularProgress size={30} />)}
                    {loading && <>Deleting</>}
                    {!loading && <span> Delete</span>}
                  </Button>
           </DialogActions>
        </Dialog>
      </div>
    );
  }
}
RemoveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.Object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(RemoveDialog);
