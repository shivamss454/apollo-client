import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Math from '../../components/Math/Math';

class ChildrenDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  children = (first, second, operator, result) => {
    switch (operator) {
    case '+': return (`Sum of ${first} and ${second} is ${result}`);
    case '-': return (`Substraction of ${first} and ${second} is ${result}`);
    case '*': return (`multiplication of ${first} and ${second} is ${result}`);
    case '/': return (`division of ${first} and ${second} is ${result}`);
    default: return (` ${first} ${operator} ${second} is invalid ${result}`);
    }
  }

  render() {
    return (
      <>
        <Typography>
          <Math first={7} second={4} operator="+">{this.children}</Math>
          <br />
          <br />
          <Math first={7} second={3} operator="-">{this.children}</Math>
          <br />
          <br />
          <Math first={7} second={4} operator="*">{this.children}</Math>
          <br />
          <br />
          <Math first={7} second={4} operator="/">{this.children}</Math>
          <Math first={7} second={0} operator="/" />
          <Math first={7} second={4} operator="^" />
        </Typography>
      </>
    );
  }
}
export default ChildrenDemo;
