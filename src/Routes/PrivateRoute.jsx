/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import PrivateLayout from '../Layouts/PrivateLayout/PrivateLayout';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <PrivateLayout>
          <Component {...matchProps} />
        </PrivateLayout>
      )}
    />
  );
}
PrivateRoute.propTypes = {
  component: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default PrivateRoute;
