import Navbar from './NavBar';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom';
import NotFound from './NotFound';
import GuessSpot from './GuessSpot';
import PictureTrivia from './PictureTrivia';
import StoryMode from './StoryMode';
import MemoryGame from './MemoryGame';
import photoDetails from './PhotoDetails.json';
import 'bootstrap/dist/css/bootstrap.min.css';

/* App.js is the first file to load and is the root of the web app rendered by index.js */

function App() {

  // set title to Photo Puzzles
  document.title = "Photo Puzzles";

  // return whole App 
  return (
    // currently uses BrowserRouter to change screens. Not sustainable. kiran.raintown.org/guesspot will not work if typed directly into 
    // browser. This should later be changed to be handeled on the server 
    <BrowserRouter>
      <div className="App">
        <div className="content">
          <Routes>
            /* Homepage */
            <Route exact path="/" element={<Home/>}/>

            /* GuessSpot */
            <Route exact path="/guessspot" element={<GuessSpot/>}/>

            /* PictureTrivia */
            <Route exact path="/picturetrivia" element={<PictureTrivia/>}/>

            /* StoryMode */
            <Route exact path="/storymode" element={<StoryMode/>}/>

            /* MemoryGame */
            <Route exact path="/memorygame" element={<MemoryGame/>}/>
            
            /* The * catches anything not stated above and will show a Page not found error
            This error's css needs to be updated  */
            <Route path="*" element={<NotFound/>}/>
            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

// export to de displayed as root of Page
export default App;
