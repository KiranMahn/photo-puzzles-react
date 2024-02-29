
import './App.css';
import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
const GameButton = (props) => {
    const { title, navigation } = props;
    console.log("title: " + title);

    const getUrl = () => {
        let beginning = "/";
        let url = ""

        switch(title) {
            case "Guess the spot":
                url = beginning + "Globe.png";
                console.log("url: " + url);
                return url;
            case "Picture Trivia":
                url = beginning + "Medal.png";
                console.log("url: " + url);
                return url;
            case "Story Creation":
                url = beginning + "Book.png";
                console.log("url: " + url);
                return url;
            case "Memory Game":
                url = beginning + "Brain.png";
                console.log("url: " + url);
                return url;
            default: 
                url = beginning + "notFound.png";
                console.log("url: " + url);
                return url;
        }
    }

    const handleClick = (title) => {
        console.log("clicked: " + title);
        switch(title) {
            case "Guess the spot":
                console.log("going to guess spot");
                //navigation.navigate('GuessSpot', {name: 'Jane'})
                break;
            case "Picture Trivia":
                console.log("going to picture trivia");
                navigation.navigate('PictureTrivia', {name: 'Jane'})
                break;
            case "Story Creation":
                console.log("going to storyMode");
                navigation.navigate('StoryMode', {name: 'Jane'})
                break;
            case "Memory Game":
                console.log("going to Memory game");
                navigation.navigate('MemoryGame', {name: 'Jane'})
                break;
            
        }
        
        console.log(title + " has been pressed!!!");
    }

    return ( 
        
        <button onClick={() => handleClick(title)} className={"card"} style={{backgroundImage: `url(${getUrl()})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",   backgroundOrigin: "content-box", padding: "1.5em", paddingBottom: "2.5em" 
    }}>
           
            <Link to="/guessspot" className={"text"}> {title} </Link>
        </button>
        
        
    );
}


export default GameButton;