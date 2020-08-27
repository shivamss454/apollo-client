import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailIcon from '@material-ui/icons/Mail';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import localStorage from 'local-storage';
import {
  Avatar, withStyles, Button, TextField, Typography, InputAdornment, Container, Box,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MyContext } from '../../contexts';
import LoginSchema, { useStyles } from '../../configs/constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
      loading: false,
      redirect: false,
      error: {
        email: '',
        password: '',
      },
      touch: {
        email: false,
        password: false,
      },
    };
  }

  handleData = (data) => (e) => {
    this.setState({ [data]: e.target.value });
  }

  handleRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/Trainee" />;
    }
    return null;
  }

  handleReset = () => {
    this.setState({
      email: '',
      password: '',
      touch: {},
    });
  }

  onClickData = async (data, opensnackbar) => {
    try{
      this.setState({ loading: true });
      const { loginUser } = this.props;
      const { email, password } = data;
      const res = await loginUser({ variables:{ email, password } });
      localStorage.set('token', res.data.loginUser);
      this.setState({ loading: false, redirect: true });
    } catch {
      this.setState({ message: 'invalid email and password', loading: false}, () => {
        const { message } = this.state;
        opensnackbar(message, 'error');
      }); 
    }
  }

  getError = (key) => {
    const { touch, error } = this.state;
    if (touch[key]) {
      LoginSchema.validateAt(key, this.state).then(() => {
        if (error[key] !== '') {
          this.setState({ error: { ...error, [key]: '' } });
        }
      }).catch((err) => {
        if (err.message !== error[key]) {
          this.setState({ error: { ...error, [key]: err.message } });
        }
      });
    }
    return error[key];
  }

  hasErrors = () => {
    try {
      LoginSchema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  isTouched = (val) => {
    const { touch } = this.state;
    this.setState({ touch: { ...touch, [val]: true } });
  }

  render() {
    const { classes } = this.props;
    const {
      email, password, error, loading,
    } = this.state;
    // console.log(this.state);
    return (
      <Container component="main" maxwidth="xs">
        <Box mx="auto" p={2} className={classes.box} boxShadow={3}>
          <div className={classes.Container}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                id="email"
                label="Email Address"
                margin="normal"
                value={email}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon style={{ fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                onChange={this.handleData('email')}
                helperText={this.getError('email')}
                onBlur={() => { this.isTouched('email'); }}
                error={error.email}
                fullWidth
              />
              &nbsp;
              <TextField
                id="password"
                type="password"
                label="Password"
                margin="normal"
                value={password}
                error={error.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VisibilityOffIcon style={{ fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                onChange={this.handleData('password')}
                onBlur={() => { this.isTouched('password'); }}
                helperText={this.getError('password')}
                fullWidth
              />
              <MyContext.Consumer>
                {
                  ({ opensnackbar }) => (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={this.hasErrors()}
                      onClick={() => {
                        this.onClickData({ email, password },opensnackbar);
                        this.handleReset();
                      }}
                    >
                      {loading && (
                        <CircularProgress size={40} />
                      )}
                      {loading && <span>Signing in</span>}
                      {!loading && <span>Sign in</span>}
                      {this.handleRedirect()}
                    </Button>

                  )
                }
              </MyContext.Consumer>

            </form>
          </div>
        </Box>
      </Container>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.func.isRequired,
};
export default withStyles(useStyles)(Login);
