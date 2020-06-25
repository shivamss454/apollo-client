import styled, { css } from 'styled-components';

const Input = styled.input`
background: transparent;
  border-radius: 3px;
  width:99.3%;
  padding:1%;
  border: 1px solid grey;
  color: black;
  background: white;
  margin-left:.3%;

  ${(props) => props.error && css`
    border: 1px solid red;
    color: red;
`}
${(props) => props.bgcolor && css`
    background: white;
 `};
`;
const Container = styled.div`
  border: 1px solid black;

`;
const Para = styled.p`
  color: red;
`;

export {
  Input, Container, Para,
};
