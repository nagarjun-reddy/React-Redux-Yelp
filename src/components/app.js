import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPlaces } from '../actions/index';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {term: ''};
  }

  onButtonClick(event){
		this.props.fetchPlaces(this.state.term);
	}

  onInputChange(event){
    this.setState({term:event.target.value});
  }

  render() {
    return (
      <div className="search-bar">
  			<div className="form-group">
  					<div className="input-group">
            <input type="text" className="form-control" onChange={this.onInputChange.bind(this)} value={this.state.term} placeholder="Type search term"/>
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button"
              onClick={this.onButtonClick.bind(this)}>Go!</button>
            </span>
  					</div>
  			</div>
  		</div>
    );
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ fetchPlaces },dispatch)
}

export default connect(null,mapDispatchToProps)(App)
