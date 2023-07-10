
import './App.css';
import {BrowserRouter, Routes , Route} from 'react-router-dom';
import Home from './views/home/home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" exact component  = {Home}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
