import React from 'react';
import { Textfield } from '../../components/TextField/TextField';
import { Container } from '../../components/TextField/style';
import { banner } from '../../configs/constants';
import Slider from '../../components/Slider/Slider';


const TextFieldDemo = () => (
  <>
    <Container>
      <div>
        <div>
          <Slider altText="No Image" duration="2000" height="400" random banner={banner} />
        </div>
      </div>
      <h3>This is a Disabled Input</h3>
      <Textfield placeholder="Disabled Input" disabled />
      <h3>A Valid Input</h3>
      <Textfield primary placeholder="accessible" bgcolor />
      <h3>An Input with Errors</h3>
      <Textfield placeholder="101" error bgcolor />
      <p style={{ color: 'red' }}>could not be greater than 100 </p>

    </Container>
  </>
);
export default TextFieldDemo;
