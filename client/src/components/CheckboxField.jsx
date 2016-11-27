import React from 'react'; 
import {Checkbox, FormGroup, ControlLabel, Col} from 'react-bootstrap';
import PureRenderMixin from 'react-addons-pure-render-mixin';

/*
const Checkbox = ReactBootstrap.Checkbox;
const FormGroup = ReactBootstrap.FormGroup;
const ControlLabel = ReactBootstrap.ControlLabel;
const Col = ReactBootstrap.Col;
*/

export default React.createClass({
  onChange: function (evt) {
    this.props.setProp(evt.target.attributes.name.value, evt.target.value);
  },
  render: function () {
    return (
      <FormGroup controlId={ this.props.name + "Checkbox" }>
        <Col smOffset={ 1 } >
          <Checkbox name={ this.props.name } value={ this.props.ticket[this.props.name] } onChange={ this.onChange }>{ this.props.name }</Checkbox>
        </Col>
      </FormGroup>
    );
  }
});
