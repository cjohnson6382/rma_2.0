import React from 'react'; 
import { FormGroup, FormControl, ControlLabel, Form, Col } from 'react-bootstrap';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  setProp: function (evt) {
    this.props.setProp(evt.target.attributes.name.value, evt.target.value);
  },
  getVal: function () {
		console.log(this.props.ticket.get(this.props.name));
    return this.props.ticket.toJS()[this.props.name];
  },
  render: function () {
    let options = this.props.options.map((option, index) => {
      return ( <option key={ index } name={ this.props.name }>{ option }</option> )
    });

    return (
      <FormGroup controlId={ this.props.controlId }>
        <Col componentClass={ ControlLabel } sm={ 1 } >{ this.props.name }:</Col>
        <Col sm={ 8 } >
          <FormControl
            componentClass="select"
            placeholder={ this.props.name}
            name={ this.props.name }
            onChange={ this.setProp }
            value={ this.props.ticket.get(this.props.name) }
          >
            { options }
          </FormControl>
        </Col>
      </FormGroup>
    );
  }
});
