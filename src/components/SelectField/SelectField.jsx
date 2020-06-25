import React from 'react';
import PropTypes from 'prop-types';
import { Select, Para } from './style';

export const SelectField = (props) => {
  const {
    options, defaultoptions, onChange, error, onBlur,
  } = props;
  return (
    <>
      <Select onChange={onChange} onBlur={onBlur} error>
        {defaultoptions && <option>{defaultoptions}</option>}
        {
          options && options.length && options.map(({ label, value }) => (
            <option key={label} value={value}>{label}</option>
          ))
        }
      </Select>
      <Para>{error}</Para>
    </>
  );
};
SelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  defaultoptions: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
};
SelectField.defaultProps = {
  options: [],
  defaultoptions: 'Select',
};
