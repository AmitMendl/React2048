import './App.css';
import Grid from './Components/Grid/Grid';
import React from 'react';

function App() {

  return (
    <div className="App">
      <div className='Header'>
        <b>
          2048
        </b>
      </div>
      <div className='Content'>
        <div style={{'margin': 'auto'}}>
          <Grid width={4} height={4} />
        </div>
      </div>
    </div>
  );
}

export default App;
