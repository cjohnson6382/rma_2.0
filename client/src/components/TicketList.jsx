import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
//	import classNames from 'classnames'

import {Table} from 'react-bootstrap';

//	const Table = ReactBootstrap.Table;

import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

import ButtonGrid from './ButtonGrid';


export const TicketList = React.createClass({
  mixins: [PureRenderMixin],
  getList: function () {
    return this.props.ticket_list || [];
  },
  buildList: function () {
    const ticketJst = this.getList().map((ticket) => {
      //  shouldn't modify the date here if I can avoid it; date should be stored in ISO format
			let date = new Date(ticket.date).toISOString().substring(0, 10);
      return (
        <tr onClick={ this.props.onclick } key={ ticket.id } value={ ticket.id } >
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
			</div>
    );
  }
});

function mapStateToProps(state) {
  return {
    ticket: state.get('ticket'),
    ui: state.get('ui'),
    ticket_list: state.get('ticket_list')
  };
}

export const TicketListContainer = connect(
  mapStateToProps,
  actionCreators
)(TicketList);
