import React from 'react';
import { Icon } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';

function Footer() {
  return (
    <footer align="center">
      <Icon>
        <p style={{ fontsize: '17px', color: 'grey' }}>
          <CopyrightIcon />
          {' '}
          Successive Technologies
        </p>
      </Icon>
    </footer>
  );
}
export default Footer;
