import React from 'react';
import PropTypes from 'prop-types';
import { Input, Para } from './style';

export const Textfield = (props) => {
  const {
    onChange, value, error, onBlur, disabled,
  } = props;
  return (
    <>
      <Input type="text" value={value} onChange={onChange} onBlur={onBlur} error={error} disabled={disabled} />
      <Para>{error}</Para>
    </>
  );
};
Textfield.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};
Textfield.defaultProps = {
  disabled: false,
};
