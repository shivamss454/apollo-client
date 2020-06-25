import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

const TraineeRoute = (props) => {
  const { match: { path } } = props;
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path={path} component={TraineeList} />
          <Route exact path={`${path}/:TraineeId`} component={TraineeDetail} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
TraineeRoute.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default TraineeRoute;
