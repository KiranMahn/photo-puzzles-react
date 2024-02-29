import Navbar from './NavBar';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom';
import NotFound from './NotFound';
import GuessSpot from './GuessSpot';

function App() {

  const title = 'Welcome to my photo site!';

  return (
    <BrowserRouter>
      <div className="App">
        {/* <Navbar /> */}
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/guessspot" element={<GuessSpot/>}/>
            {/* <Route path="/create">
              <Create/>
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails/>
            </Route> */}
            <Route path="*" element={<NotFound/>}/>
            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
