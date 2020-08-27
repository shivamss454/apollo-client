import PropTypes from 'prop-types';
import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const PrivateLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <br />
      {children}
    </>
  );
};
PrivateLayout.propTypes = {
  children: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default PrivateLayout;
