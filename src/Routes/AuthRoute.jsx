/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthLayout from '../Layouts/AuthLayout/Authlayout';

function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <AuthLayout>
          <Component {...matchProps} />
        </AuthLayout>
      )}
    />
  );
}
AuthRoute.propTypes = {
  component: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default AuthRoute;
