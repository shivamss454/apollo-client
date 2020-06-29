import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import {
  DialogActions, DialogContent, DialogContentText, InputAdornment,
  TextField, Grid, Button, Dialog, DialogTitle, withStyles,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from '../../../../configs/constants';

class EditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      loading: false,
      message: '',
      isValid: false,
      touch: {},
    };
  }

  isTouched = (key) => {
    const { touch } = this.state;
    const { data } = this.props;
    this.setState({ touch: { ...touch, [key]: true }, isValid: true }, () => {
      Object.keys(data).forEach((keys) => {
        if (!touch[keys]) {
          this.setState({
            [keys]: data[keys],
          });
        }
      });
    });
  };

  formReset = () => {
    this.setState({
      name: '',
      email: '',
      isValid: false,
      touch: {},
    });
  }

  handleData = (data) => (event) => {
    const { touch } = this.state;
    this.setState({ [data]: event.target.value, isValid: true }, () => {
      this.setState({
        touch: {
          ...touch,
          [data]: true,
        },
      });
    });
  };


  render() {
    const {
      open, onClose, classes, data, onSubmit, loading,
    } = this.props;
    const { originalId: id } = data;
    const {
      name, email, isValid,
    } = this.state;
    return (
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" className={classes.root}>
          <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter Your Trainee Details.
            </DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-helperText"
                  label="Name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  defaultValue={data.name}
                  variant="outlined"
                  onChange={this.handleData('name')}
                  onBlur={() => { this.isTouched('name'); }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-helperText"
                  label="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon />
                      </InputAdornment>
                    ),
                  }}
                  defaultValue={data.email}
                  variant="outlined"
                  onChange={this.handleData('email')}
                  onBlur={() => { this.isTouched('email'); }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={!isValid}
              onClick={() => {
                onSubmit({ name, email, id });
                this.formReset();
              }}
              color="primary"
            >
              {loading && <CircularProgress size={30} />}
              {loading && <span>Submitting</span>}
              {!loading && <span> Submit</span>}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.Object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(EditDialog);
