import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Table, Modal, Button } from 'react-bootstrap';

import { Ticket } from './Ticket';

import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

import ButtonGrid from './ButtonGrid';

export const TicketList = React.createClass({
  mixins: [PureRenderMixin],
  getList: function () {
    return this.props.ticket_list || [];
  },
	getTicket: function (evt) {
		evt.preventDefault();
	
		this.props.getTicket(evt);
		this.props.showModal(true);
	},
	saveTicket: function () {
		this.props.saveTicket();
		this.props.showModal(false);	
	},
	hideModal: function () {
		this.props.showModal(false);
	},
  buildList: function () {
    const ticketJst = this.getList().map((ticket) => {
			ticket = ticket.toJS();

			let date = new Date(ticket.date).toISOString().substring(0, 10);
      return (
        <tr onClick={ this.getTicket } key={ ticket.id } value={ ticket.id } >
          <td>{ ticket.id }</td>
          <td>{ ticket.vendor }</td>
          <td>{ ticket.customer }</td>
          <td>{ ticket.invoice }</td>
          <td>{ ticket.serial }</td>
          <td>{ date }</td>
	 	 			<td onClick={ this.props.deleteTicket } value={ ticket.id } >[X]</td>
        </tr>
      );
    });
		return ticketJst;
  },
  render: function () {
    return (
			<div>
	      <Table striped bordered condensed hover>
	        <thead>
	          <tr>
	            <th width="5%">Id</th><th width="15%">Vendor</th><th width="15%">Customer</th>
	            <th width="15%">Invoice</th><th width="15%">Serial</th><th width="15%">Date</th><th width="5%">Delete</th>
	          </tr>
	        </thead>
	        <tbody>
	          { this.buildList() }
	        </tbody>
	      </Table>
	     	<ButtonGrid { ...this.props } />
        <Modal bsSize="large" show={ this.props.showmodal } >
          <Modal.Header>
            <Modal.Title>Ticket Properties</Modal.Title>
          </Modal.Header>
          <Modal.Body>
						<Ticket { ...this.props } />
          </Modal.Body>
          <Modal.Footer>
						<Button onClick={ this.saveTicket }>Save</Button>
            <Button onClick={ this.hideModal }>Cancel</Button>
          </Modal.Footer>
        </Modal>
			</div>
    );
  }
});

function mapStateToProps(state) {
  return {
    ticket: state.get('ticket'),
    showmodal: state.getIn(['ui', 'showmodal']),
    ticket_list: state.get('ticket_list'),
		input: state.getIn(['ui', 'input']),
		autocompletes: state.getIn(['autocomplete', 'options']),
		popover: state.getIn(['autocomplete', 'countdown']),
		autocompletes_visible: state.getIn(['ui', 'autocompletes_visible'])
  };
}

export const TicketListContainer = connect(
  mapStateToProps,
  actionCreators
)(TicketList);
