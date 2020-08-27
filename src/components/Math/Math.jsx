import React from 'react';
import PropTypes from 'prop-types';

const Math = (props) => {
  const {
    first, second, operator, children,
  } = props;
  let result = 0;
  switch (operator) {
  case '+': result = first + second;
    break;
  case '-': result = first - second;
    break;
  case '*': result = first * second;
    break;
  case '/': result = (second === 0) ? 'Infinity' : first / second;
    break;
  default: result = 'invalid operation';
    break;
  }
  if (children) {
    return (children(first, second, operator, result));
  }
  return (
    <>
      <p>
        {' '}
        {first}
        {' '}
        {operator}
        {' '}
        {second}
        {' '}
        =
        {' '}
        {result}
      </p>
    </>
  );
};
Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};

Math.defaultProps = {
  children: '',
};
export default Math;
