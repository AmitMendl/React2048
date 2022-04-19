import './App.css';
import './Components/Tiles.css';
import Grid from './Components/Grid';

function App() {

  document.addEventListener('keydown', function(e) {
        console.log(e.key)
  });
    

  return (
    <div className="App">
      <div className='Header'><b>2048</b></div>
      <div className='Content'>
        <Grid width={4} height={4} style={{margin: 0}}/>
      </div>
    </div>
  );
}

export default App;
