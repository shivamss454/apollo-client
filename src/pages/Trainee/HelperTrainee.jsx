import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

function HelperTrainee(props) {
  const {
    icons, error, id, label, type, onBlur, onChange, helperText,
  } = props;
  const Icons = icons;
  return (
    <>
      <TextField
        required
        id={id}
        type={type}
        label={label}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icons style={{ fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        onChange={onChange}
        helperText={helperText}
        onBlur={onBlur}
        error={error}
        fullWidth
      />
    </>
  );
}

HelperTrainee.propTypes = {
  icons: PropTypes.instanceOf(Object),
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  helperText: PropTypes.string,
  id: PropTypes.string,
};
HelperTrainee.defaultProps = {
  error: false,
  icons: {},
  label: '',
  type: false,
  helperText: '',
  id: '',
};
export default HelperTrainee;
