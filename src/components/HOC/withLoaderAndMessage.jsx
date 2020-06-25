import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const withLoaderAndMessage = (Wrapper) => (props) => {
  const { loading, count, ...rest } = props;
  if (loading) {
    return (
      <Box paddingLeft="50%">
        <CircularProgress />
      </Box>
    );
  }
  if (!count) {
    return (
      <Box paddingLeft="50%">
        <h2>Oops No more Trainees</h2>
      </Box>
    );
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (<Wrapper loading={loading} count={count} {...rest} />);
};
export default withLoaderAndMessage;
