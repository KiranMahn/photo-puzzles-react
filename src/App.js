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

function App() {

  const title = 'Welcome to my photo site!';
  document.title = "Photo Puzzles";

  return (
    <BrowserRouter>
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/guessspot" element={<GuessSpot/>}/>
            <Route exact path="/picturetrivia" element={<PictureTrivia/>}/>
            <Route exact path="/storymode" element={<StoryMode/>}/>
            <Route exact path="/memorygame" element={<MemoryGame/>}/>
            
            <Route path="*" element={<NotFound/>}/>
            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
