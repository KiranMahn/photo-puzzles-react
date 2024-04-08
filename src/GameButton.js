
import { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Pressable } from 'react-native';
import { View, Image } from 'react-native-web';
const GameButton = (props) => {
    const { title, navigation } = props;
    const [linkAddy, setLink] = useState("./guessspot");
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

    const getLinkAddy = (title) => {
        switch(title) {
            case "Guess the spot":
                console.log("going to guess spot");
                return("./guessspot");
            case "Picture Trivia":
                console.log("going to picture trivia");
                return("./picturetrivia");
                
            case "Story Creation":
                console.log("going to storyMode");
                return("./storymode");
                
            case "Memory Game":
                console.log("going to Memory game");
                return("./memorygame");
        }
                
    }

    const handleClick = (title) => {
        console.log("clicked: " + title);
        switch(title) {
            case "Guess the spot":
                console.log("going to guess spot");
                setLink("./guessspot");
                //navigation.navigate('GuessSpot', {name: 'Jane'})
                break;
            case "Picture Trivia":
                console.log("going to picture trivia");
                setLink("./picturetrivia");
                // navigation.navigate('PictureTrivia', {name: 'Jane'})
                break;
            case "Story Creation":
                console.log("going to storyMode");
                setLink("./storymode");
                // navigation.navigate('StoryMode', {name: 'Jane'})
                break;
            case "Memory Game":
                console.log("going to Memory game");
                setLink("./memorygame");
                // navigation.navigate('MemoryGame', {name: 'Jane'})
                break;
            
        }
        
        console.log(title + " has been pressed!!!");
    }

    console.log("url:: " + getUrl());

    return ( 
        <button  onClick={() => handleClick(title)} className={"card"} style={{backgroundImage: `url(` + getUrl() + `)`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundOrigin: "content-box", padding: "1.5em", paddingBottom: "2.5em", height: '30vh'}}>
            <Link style={{textDecoration: 'none', color: 'rgb(70,70,70)'}} to={getLinkAddy(title)} className={"text"}> {title} </Link>
        </button>
    );
}


export default GameButton;