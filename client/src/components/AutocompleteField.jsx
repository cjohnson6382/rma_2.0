import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Popover, Overlay, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';

const CustomPopover = React.createClass({
	select: function (evt) {
		this.props.setAutocompleteField(this.props.name, evt.currentTarget.attributes.value.value);
		//	this.props.setAutocompletes([]);
		this.props.setVis(false);
	},
	render: function () {
		let autocompletes = this.props.autocompletes.map((option, index) => {
			return ( <div key={ index } name={ this.props.name } value={ option } onClick={ this.select } >{ option }</div> )
		});

		return (
			<div
				id="autocomplete-popover"
				style={{
					position: 'relative',
					display: 'inline-block',
					backgroundColor: '#EEE',
					boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
					border: '1px solid #CCC',
					borderRadius: 3,
					marginLeft: -5,
					marginTop: 5,
					padding: 10,
				}}
			>
				{ autocompletes }
			</div>
		)
	}
});


//	setup client index to check state when it gets a server emit; if setVis = true, ignore 'state' updates and only do 'autocompletes' updates

export default React.createClass({
	mixins: [PureRenderMixin],
	update: function (evt) {
		evt.preventDefault();
		if (
				evt.target.value === '' || 
				this.props.ticket[this.props.name] && 
				this.props.ticket[this.props.name].includes(evt.target.value)
			) 
		{ 
			this.props.setAutocompletes([]);
		}
		else {
			if (evt.target.value.includes(this.props.ticket[this.props.name]) && this.props.autocompletes.count < 15) {
				console.log('getting to the filter option', this.props.ticket[this.props.name], evt.target.value);
				let newAutocompletes = this.props.autocompletes.filter((item) => { 
					return item.includes(evt.target.value) 
				});
				this.props.setAutocompletes(newAutocompletes);
			} else {
				this.props.getOptions(this.props.name, evt.target.value); 
			}

			if (this.props.autocompletes.count() > 0) {
				this.props.setVis(true);
			}
		}
		this.props.setAutocompleteField(this.props.name, evt.target.value);
	},
	onKeyPress: function (evt) {
		if (evt.charCode == 13) this.props.setAutocompletes([]);
	},
	selectAutocomplete: function (evt) {
		evt.preventDefault();
		this.props.setAutocompletes([]);
		this.props.setAutocompleteField(this.props.name, evt.target.innerText);
	},
	cancelHideAutocompletes: function () {
		console.log('cancelHideAutocompletes');
		this.props.cancelHideAutocompletes();
	},
	hideAutocompletes: function () {
		let popover = setTimeout(() => {this.props.setVis(false)}, 1000);
		this.props.hideAutocompletes(popover);
	},
	render: function () {
		return (
			<FormGroup controlId={ this.props.name + "Autocomplete" }>
				<Col componentClass={ ControlLabel } sm={ 2 } >{ this.props.name }:</Col>
				<Col sm={ 3 }>
					<input
						ref="target"
						name={ this.props.name }
						type="text"
						placeholder={ this.props.name }
						onKeyPress={ this.onKeyPress }
						onChange={ this.update }
						value = { this.props.ticket[this.props.name] }
					/>
					<Overlay
						show={ this.props.autocompletes_visible }
						container={ this }
						placement="right"
						target={ () => ReactDOM.findDOMNode(this.refs.target) }
						onEntered={ this.hideAutocompletes }
					>
						<CustomPopover { ...this.props } />
					</Overlay>
				</Col>
			</FormGroup>
		);
	}
});