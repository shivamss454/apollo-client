import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer/Footer';

const AuthLayout = (props) => {
  const { children } = props;
  return (
    <>
      {children}
      <Footer />
    </>
  );
};
AuthLayout.propTypes = {
  children: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default AuthLayout;
