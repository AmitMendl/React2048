import { useSpring, animated } from 'react-spring'
import React from 'react';


function Text() {
  const [flip, set] = useState(false)
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip),
})

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