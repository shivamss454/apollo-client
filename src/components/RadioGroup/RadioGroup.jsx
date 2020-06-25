import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Para from './style';

export const RadioGroup = (props) => {
  const {
    options, onChange, onBlur, error,
  } = props;
  return (
    <>
      {
        options && options.length && options.map(({ label, value }) => (
          <Fragment key={label}>
            {' '}
            <input type="radio" name="game" value={value} onChange={onChange} onBlur={onBlur} error={error} />
            {label}
            <br />
          </Fragment>
        ))
      }
      <Para>{error}</Para>
    </>
  );
};
RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};
RadioGroup.defaultProps = {
  options: [],
};
