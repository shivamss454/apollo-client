/* eslint-disable no-console */
import React from 'react';
import * as yup from 'yup';
import { Textfield } from '../../components/TextField/TextField';
import { SelectField } from '../../components/SelectField/SelectField';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import { SelectOptions, RadioCricket, RadioFootball } from '../../configs/constants';
import ButtonField from '../../components/Button/Button';

const ValidationSchema = yup.object().shape({
  name: yup.string().required('Name is Required').min(3),
  sports: yup.string().required('sports is Required'),
  cricket: yup.string().when('sports', {
    is: 'cricket',
    then: yup.string().required('please select options'),
  }),
  football: yup.string().when('sports', {
    is: 'football',
    then: yup.string().required('please select options'),
  }),
});

class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sports: '',
      cricket: '',
      football: '',
      touch: {
        name: false,
        sports: false,
        cricket: false,
        football: false,
      },
    };
  }

  getError = (key) => {
    const { touch } = this.state;
    if (touch[key] && this.hasErrors()) {
      try {
        ValidationSchema.validateSyncAt(key, this.state);
      } catch (err) {
        return err.message;
      }
    }
    return false;
  };

  hasErrors = () => {
    try {
      ValidationSchema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  isTouched = (key) => {
    const { touch } = this.state;
    this.setState({ touch: { ...touch, [key]: true } });
  }

  onChangedTextField = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangedSelectField = (e) => {
    let { sports, cricket, football } = this.state;
    sports = e.target.value;
    if (sports === 'Select') {
      sports = '';
    }
    cricket = '';
    football = '';
    this.setState({ sports, cricket, football });
  };

  onChangedRadioGroup = (e) => {
    const { sports } = this.state;
    this.setState({ cricket: '', football: '' });
    this.setState({ [sports]: e.target.value });
  };

  getRadioOptions = () => {
    const { sports } = this.state;
    return (sports === 'cricket') ? RadioCricket : RadioFootball;
  }

  render() {
    console.log(this.state);
    const { sports, name } = this.state;
    return (
      <div>
        <h3>Name</h3>
        <Textfield
          value={name}
          onChange={this.onChangedTextField}
          error={this.getError('name')}
          onBlur={() => this.isTouched('name')}
        />
        <h3>Select The Game You Play</h3>
        <SelectField
          onChange={this.onChangedSelectField}
          defaultoptions="Select"
          options={SelectOptions}
          error={this.getError('sports')}
          onBlur={() => this.isTouched('sports')}
        />
        {
          (sports === '') || (sports === 'Select') ? false : (
            <>
              <h3>What do You do</h3>
              <RadioGroup
                onChange={this.onChangedRadioGroup}
                options={this.getRadioOptions()}
                error={this.getError(sports)}
                onBlur={() => this.isTouched(sports)}
              />
            </>
          )
        }
        <div align="right">
          <ButtonField value="cancel" />
          <ButtonField value="submit" disabled={this.hasErrors()} />
        </div>
      </div>
    );
  }
}
export default InputDemo;
