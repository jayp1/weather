import React from 'react';
import './location.css';
class Location extends React.Component {
    
    state = {
        city: null,
    }
    handleChange = (event) => {
        this.setState({city:event.target.value});
    }

    render() {
        return (
            <div className="Location">
                <form className="form-inline my-2 my-lg-0" onSubmit={(event)=>this.props.clicked(event,this.state.city)}>
                    <input className="form-control mr-sm-2" onChange={this.handleChange} type="text" placeholder="Search for a city" aria-label="Search" />
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                </form>
                {this.props.error ? <p style={{color:"red"}}>{this.props.error}</p>: <p></p>}
            </div>
        );
    }

}
export default Location;