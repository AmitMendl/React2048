import React from 'react';


class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            value: props.value 
        };
      }

    render() {

      return (<div className={this.state.value == null ? 'Empty' : 'Tile'}>
          <b>
            {this.state.value}
          </b>
      </div>);
    }
  }

export default Tile