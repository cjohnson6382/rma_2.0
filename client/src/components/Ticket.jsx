import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actionCreators from '../action_creators';

import { Button, Tabs, MenuItem, Checkbox, FormGroup, FormControl, ControlLabel, Form, Col } from 'react-bootstrap';

import AutocompleteField from './AutocompleteField';
//  import InputField from './InputField';
import StaticInputField from './StaticInputField';
//  import TexboxInputField from './TextboxInputField';
import SelectField from './SelectField';
import CheckboxField from './CheckboxField';

/*
import TabInventory from './TabInventory';
import TabCustomer from './TabCustomer';
import TabStatus from './TabStatus';
import TabOther from './TabOther';
*/

export const Ticket = React.createClass({
  mixins: [PureRenderMixin],
  setProp: function (prop, value) {
    this.props.setProp([prop, value]);
  },
	render: function () {
		return (
			<Form horizontal onSubmit={ this.submit } autoComplete="off" >
				<StaticInputField val={ this.props.ticket.get('id') } name='id' type='text' />
				<StaticInputField val={ this.props.ticket.get('date')} name='date' type='date' />
				<SelectField  {...this.props} controlId="typeSelect" name="type" options={ [
				    "DOA - Cross Ship", "Warranty - Repair & Return", "Warranty - Cross Ship", "Non-Warranty - Repair & Return", "Other - See Notes"
			    ] }
		    />
       	<AutocompleteField {...this.props} name="customer" />
				<CheckboxField {...this.props} name="dropship" />
			</Form>
		);
	}
});

/*
			 	<Col sm={ 20 } ><Tabs defaultActiveKey={ 1 } id="tabs" >
          { TabInventory.bind(this)() }
          { TabCustomer.bind(this)() }
          { TabStatus.bind(this)() }
          { TabOther.bind(this)() }
			 	</Tabs></Col>

function mapStateToProps(state) {
  return {
    input: state.getIn(['autocomplete', 'input']),
    autocompletes: state.getIn(['autocomplete', 'options']),
    popover: state.getIn(['autocomplete', 'popover_countdown']),
    autocompletes_visible: state.getIn(['ui', 'autocompletes_visible'])
  }
}

export const TicketContainer = connect(
  mapStateToProps,
  actionCreators
)(Ticket);


//  don't track fields, submit changes to the local store, just like the search bar; on submit, send changes to server

//  should pass the setProp down to all the child elements in the ticket?
//    removes the need to include it on the props here; can just use it at the bottommost element in the chain

//  value should not be hard-coded as a prop
//    you can return the value that's stored in teh state and use that as the value, cause that's mutable, right?

//  the placeholder is just the id with the first letter capitalized and any spaces replaced by dashes

*/
