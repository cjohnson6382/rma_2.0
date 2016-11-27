import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    return (
      <FormGroup controlId={ this.props.name + "Static" } >
        <Col componentClass={ ControlLabel } sm={ 2 } >{ this.props.name }:</Col>
        <Col sm={ 8 }>
          <FormControl.Static type={ this.props.type } placeholder={ this.props.name }>{ this.props.val }</FormControl.Static>
        </Col>
			</FormGroup>
    );
  }
});
