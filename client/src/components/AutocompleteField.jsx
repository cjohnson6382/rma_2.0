import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Popover, Overlay, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';

/*
const Popover = ReactBootstrap.Popover;
const Overlay = ReactBootstrap.Overlay;

const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const Col = ReactBootstrap.Col;
*/


const SERVER = "http://cjohnson.ignorelist.com/";

const CustomPopover = React.createClass({
  select: function (evt) {
    this.props.setProp(evt.target.attributes.name.value, evt.target.value);
    this.props.setAutocompletes([]);
  },
	render: function () {
		let autocompletes = this.props.autocompletes.map((option, index) => {
  		return ( <div key={ index } name={ this.props.data.name } onClick={ this.select } >{ option }</div> )
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
	update: function (evt) {
		evt.preventDefault();
    if (evt.target.value === '') {
			this.props.setAutocompletes([]);
		} else if (this.props.input !== '' && evt.target.value.includes(this.props.input)) {
      //  filter existing results
      let newAutocompletes = this.props.autocompletes.filter((item) => { return item.includes(evt.target.value) });
			
      //  filtering returned too few results, and there might be other results in the DB
      if (this.props.autocompletes.length > 14 && newAutocompletes.length < 5) { this.props.getOptions(evt.target.value); }
      else { this.setAutocompletes(newAutocompletes) }
		} else if (this.props.input.includes(evt.target.value)) {
			this.props.setVis(false);
      //  user deleted character; clear results
      this.setAutocompletes([]);
    } else {
      //  get new results
      this.props.getOptions(evt.target.value);
    }

		this.props.setProp(evt.target.attributes.name.value, evt.target.value);
	},
  onKeyPress: function (evt) {
		if (evt.charCode == 13) this.setAutocompletes([]);
  },
	selectAutocomplete: function (evt) {
		evt.preventDefault();
		this.props.setAutocompletes([]);
		this.props.setProps(evt.target.attributes.name.value, evt.target.innerText);
	},
	cancelHideAutocompletes: function () {
	  this.props.cancelHideAutocompletes();
	},
	hideAutocompeltes: function () {
  	let popover = setTimeout(() => {
  	    setVis(false);
  		},
  		1000
	  );
	  this.props.hideAutocompletes(popover);
	},
  render: function () {
    return (
			<FormGroup controlId={ this.props.data.name + "Autocomplete" }>
				<Col componentClass={ ControlLabel } sm={ 2 } >{ this.props.data.placeholder}:</Col>
	      <Col sm={ 3 }>
	    	  <input
						ref="target"
						name={ this.props.name }
						type="text"
						placeholder={ this.props.name }
						onKeyPress={ this.onKeyPress }
						onChange={ this.update }
						value={ this.props.input }
					/>
					<Overlay
						show={ this.props.autocompletes_visible }
						container={ this }
						placement="right"
						target={ () => ReactDOM.findDOMNode(this.refs.target) }
					>
						<CustomPopover { ...this.props } hover={ this.cancelHideAutocompletes } unhover={ this.hideAutocompletes } />
					</Overlay>
				</Col>
			</FormGroup>
    );
  }
});
