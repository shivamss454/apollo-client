import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActions } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import trainee from './data/trainee';
import NoMatch from '../NoMatch/NoMatch';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(5),
  },
  margin: {
    marginTop: theme.spacing(-7),
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 141,
  },
}));


function getDateFormatted(date) {
  return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
}

export default function TraineeDetail() {
  const classes = useStyles();
  const history = useHistory();
  const { TraineeId } = useParams();

  const found = trainee.find((elem) => elem.id === TraineeId);
  if (!found) {
    return <NoMatch />;
  }
  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image="https://image.flaticon.com/icons/svg/21/21104.svg"
          title="usercover"
        />
        <div className={classes.detail}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h5">
              {found.name}
            </Typography>
            <Typography variant="subtitle1" color="textsecondary">
              {getDateFormatted(found.createdAt)}
            </Typography>
            <Typography component="h5" variant="subtitle2">
              {found.email}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <br />
      <CardActions style={{ justifyContent: 'center' }}>
        <Button variant="contained" size="medium" className={classes.margin} onClick={() => history.push('/trainee')}>Back</Button>
      </CardActions>
    </>
  );
}
