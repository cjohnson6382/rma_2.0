import {ControlLabel, Grid, FormControl, Row, Col, Button} from 'react-bootstrap';
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

/*
const ControlLabel = ReactBootstrap.ControlLabel;
const Grid = ReactBootstrap.Grid;
const FormControl = ReactBootstrap.FormControl;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const Button = ReactBootstrap.Button;

*/

export default React.createClass({
  mixins: [PureRenderMixin],
	keypress: function (evt) {
		if (evt.charCode === 13) this.submit();
	},
	submit: function () {
	  this.props.search();
	},
	create: function () {
	  this.props.create();
	  this.props.showModal(true);
	},
	render: function () {
		return (
			<Grid>
				<Row>
					<Col componentClass={ ControlLabel } sm={1} >Before: </Col>
					<Col sm={2}>
						<FormControl
							type="date"
							placeholder="Tickets created before..."
							onChange={ this.props.before }
						/>
					</Col>
					<Col componentClass={ ControlLabel } sm={1}>After: </Col>
					<Col sm={2}>
						<FormControl
							type="date"
							placeholder="Tickets created after..."
							onChange={ this.props.after }
						/>
					</Col>
					<Col sm={4}>
						<FormControl
							onChange={ this.props.query }
							type="text"
							placeholder="Enter a Search Term"
							onKeyPress={ this.keypress }
						/>
					</Col>
					<Col sm={1}>
						<Button bsStyle="primary" onClick={ this.submit }>Submit</Button>
					</Col>
					<Col sm={1}>
						<Button bsStyle="primary" onClick={ this.create } value="new">New Ticket</Button>
					</Col>
				</Row>
			</Grid>
		);
	}
});
