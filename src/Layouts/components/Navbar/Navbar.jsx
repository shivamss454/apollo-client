import React from 'react';
import localStorage from 'local-storage';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  Spacing: {
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">

        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trainee Portal
          </Typography>
          <Button component={Link} to="/trainee" color="inherit"> Trainee </Button>
          <Button component={Link} to="/text-field-demo" color="inherit">Text Field Demo</Button>
          <Button component={Link} to="/input-demo" color="inherit">Input Demo</Button>
          <Button component={Link} to="/children-demo" color="inherit" className={classes.Spacing}>Children Demo</Button>
          <Button component={Link} to="/Login" color="inherit" onClick={() => { localStorage.clear('token'); }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
