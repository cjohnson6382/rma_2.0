import React from 'react'; 
import { FormGroup, FormControl, ControlLabel, Form, Col } from 'react-bootstrap';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  setProp: function (evt) {
    this.props.setProp(evt.target.attributes.name.value, evt.target.value);
  },
  getVal: function () {
    //  this function may not be necessary, but the field itself shouldn't be tracked and tracking it might prevent any changes because it's 2-way bound to the store
    //    this fixes the problem by making the value into a string that's unrelated to the store?
    return this.props.ticket[this.props.name];
  },
  render: function () {
    let options = this.props.data.options.map((option, index) => {
      return ( <option key={ index } name={ this.props.data.name }>{ option }</option> )
    });

//          value={ this.props.ticket[this.props.data['name']] }
//          value={ this.getVal() } ???? -- executes once, gets val,
    return (
      <FormGroup controlId={ this.props.data.controlId }>
        <Col componentClass={ ControlLabel } sm={ 1 } >{ this.props.data.name }:</Col>
        <Col sm={ 8 } >
          <FormControl
            componentClass="select"
            placeholder={ this.props.data.name}
            name={ this.props.data.name }
            onChange={ this.setProp }
            value={ this.getVal() }
          >
            { options }
          </FormControl>
        </Col>
      </FormGroup>
    );
  }
});
