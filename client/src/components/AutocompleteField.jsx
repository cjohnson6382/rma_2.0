import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Popover, Overlay, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';

const CustomPopover = React.createClass({
  select: function (evt) {
    this.props.setAutocompleteField(evt.currentTarget.attributes.value.value);
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

export default React.createClass({
	mixins: [PureRenderMixin],
	componentDidMount: function () { this.props.setAutocompleteField(this.props.ticket.get(this.props.name)) },
	update: function (evt) {
		evt.preventDefault();
		let stored_input = this.props.input;

    if (evt.target.value === '') {
			this.props.setAutocompletes([]);
		} else if (stored_input !== '' && evt.target.value.includes(stored_input)) {
      //  filter existing results
      let newAutocompletes = this.props.autocompletes.filter((item) => { return item.includes(evt.target.value) });
			
      //  filtering returned too few results, and there might be other results in the DB
      if (this.props.autocompletes.count() > 14 && newAutocompletes.count() < 5) { 
				this.props.getOptions(this.props.name, evt.target.value); 
			}
      else { this.props.setAutocompletes(newAutocompletes) }
			this.props.setVis(true);
		} else if (stored_input.includes(evt.target.value)) {
			this.props.setVis(false);
      //  user deleted character; clear results
      this.props.setAutocompletes([]);
    } else {
      //  get new results
      this.props.getOptions(this.props.name, evt.target.value);
			this.props.setVis(true);
    }

		//	this.props.setProp(evt.target.attributes.name.value, evt.target.value);
		this.props.setAutocompleteField(evt.target.value);
	},
  onKeyPress: function (evt) {
		if (evt.charCode == 13) this.props.setAutocompletes([]);
  },
	selectAutocomplete: function (evt) {
		evt.preventDefault();
		this.props.setAutocompletes([]);
		this.props.setAutocompleteField(evt.target.innerText);
	},
	cancelHideAutocompletes: function () {
		console.log('cancelHideAutocompletes');
	  this.props.cancelHideAutocompletes();
	},
	hideAutocompletes: function () {
  	let popover = setTimeout(() => {
  	    this.props.setVis(false);
  		},
  		1000
	  );
	  this.props.hideAutocompletes(popover);
	},
	getVisibility: function () { return this.props.autocompletes_visible },
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
						value = { this.props.input }
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
