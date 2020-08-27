import React from 'react';
import { Typography } from '@material-ui/core';

function NotFoundRoute() {
  return (
    <>
      <Typography component="h1" align="center" variant="h4">
        Not Found
      </Typography>
      <Typography component="h1" align="center">
        <p style={{ color: 'grey' }}>
         Seems like Page you are looking not found
        </p>
      </Typography>
    </>
  );
}
export default NotFoundRoute;
