import React from 'react';
import './App.css';
import Grid from './Components/Grid/Grid'

function App() {
  return (
    <div className="App">
      <div className='Header'>
        2048
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
