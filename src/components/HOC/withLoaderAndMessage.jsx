import React from 'react';

const withLoaderAndMessage = (Wrapper) => (props) => {
  const { loading, count, ...rest } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (<Wrapper loading={loading} count={count} {...rest} />);
};
export default withLoaderAndMessage;
