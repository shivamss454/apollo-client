import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {
  DialogActions, DialogContent, DialogContentText, Grid, Button, Dialog, DialogTitle, withStyles,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import HelperTrainee from '../../HelperTrainee';
import { Schema, useStyles } from '../../../../configs/constants';

const Obj = {
  name: PersonIcon,
  email: MailIcon,
  password: VisibilityOffIcon,
  confirmPassword: VisibilityOffIcon,
};
class FormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      touch: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  getError = (key) => {
    const { touch } = this.state;

    if (touch[key] && this.hasErrors()) {
      try {
        Schema.validateSyncAt(key, this.state);
      } catch (err) {
        return err.message;
      }
    }
    return false;
  };

  getFieldType = (val) => {
    if (val === 'password' || val === 'confirmPassword') return 'password';
    return null;
  }

  hasErrors = () => {
    try {
      Schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  };

  isTouched = (key) => {
    const { touch } = this.state;
    this.setState({ touch: { ...touch, [key]: true } });
  };

  handleData = (data) => (event) => {
    this.setState({ [data]: event.target.value });
  };

  render() {
    const Result = [];
    const {
      open, onClose, onSubmit, classes, loading:{loading},
    } = this.props;
    const {
      name, email, password,
    } = this.state;
    Object.keys(Obj).forEach((keys) => {
      Result.push(<HelperTrainee
        id={keys}
        label={keys}
        type={this.getFieldType(keys)}
        onChange={this.handleData(keys)}
        helperText={this.getError(keys)}
        onBlur={() => this.isTouched(keys)}
        icons={Obj[keys]}
        error={this.getError(keys)}
      />);
    });
    return (
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" className={classes.root}>
          <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter Your Trainee Details.
            </DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {Result[0]}
              </Grid>
              <Grid item xs={12}>
                {Result[1]}
              </Grid>
              <Grid item xs={6}>
                {Result[2]}
              </Grid>
              <Grid item xs={6}>
                {Result[3]}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
                  <Button
                    onClick={() => {
                      onSubmit({
                        name, email, password,
                      });
                    }}

                    color="primary"
                    disabled={this.hasErrors()}
                  >
                    {loading && (<CircularProgress size={30} />)}
                    {loading && <span>Submitting</span>}
                    {!loading && <span> Submit </span>}
                  </Button>

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(FormDialog);
