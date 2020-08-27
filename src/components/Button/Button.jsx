import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './style';

const ButtonField = (props) => {
  const {
    onClick, value, style, color, disabled,
  } = props;
  return (
    <>
      <Button
        type={value}
        style={style}
        color={color}
        disabled={disabled}
        onClick={onClick}
      >
        {value}
      </Button>
    </>
  );
};

ButtonField.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
  color: PropTypes.string,
  disabled: PropTypes.bool,
};

ButtonField.defaultProps = {
  color: 'default' || 'primary',
  disabled: false,
  style: {},
};
export default ButtonField;
