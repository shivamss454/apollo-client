import React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import {
  DialogActions, DialogContent, DialogContentText, Button,
  Dialog, CircularProgress, DialogTitle, withStyles,
} from '@material-ui/core';
import localStorage from 'local-storage';
import { MyContext } from '../../../../contexts';
import callAPI from '../../../../libs/utils/api';

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

  onClickData = async (id, opensnackbar) => {
    const { onSubmit } = this.props;
    const date = '2019-02-14T18:15:11.778Z';
    const isAfter = (moment(id.createdAt).isAfter(date));
    this.setState({ loading: true });
    await callAPI(
      'delete',
      `/trainee/${id}`,
      {
        headers: {
          Authorization: localStorage.get('token'),
        },
      },
    ).then((res) => {
      this.setState({ loading: false });
      if (res.status === 'ok' && isAfter) {
        this.setState({ message: 'Trainee deleted Successfully ' }, () => {
          onSubmit(res.data);
          const { message } = this.state;
          opensnackbar(message, 'success');
        });
      } else {
        this.setState({ message: 'Trainee not deleted Successfully' }, () => {
          const { message } = this.state;
          opensnackbar(message, 'error');
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const {
      open, onClose, classes, data,
    } = this.props;
    const { loading } = this.state;
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
            <MyContext.Consumer>
              {
                ({ opensnackbar }) => (
                  <Button
                    onClick={() => {
                      this.onClickData(originalId, opensnackbar);
                    }}
                    color="primary"
                  >
                    {loading && (<CircularProgress size={30} />)}
                    {loading && <>Deleting</>}
                    {!loading && <span> Delete</span>}
                  </Button>
                )
              }
            </MyContext.Consumer>

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
