
import { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Pressable } from 'react-native';
import { View, Image } from 'react-native-web';

/* GameButtons is used to create the cards with links in the homepage that lead to the mini games */

const GameButton = (props) => {
    // get the title of the button. The title is set as a prop in Home.js
    const { title } = props;

    /* gets the imageUrl based on the button title. This will need to be updated every time 
    a new GameButton is added. If there is no image stored that correlates to that title a "not found" image should be displayed */
    const getUrl = () => {

        switch(title) {
            case "Guess the spot":
                return "/Globe.png";

            case "Picture Trivia":
                return "/Medal.png";

            case "Story Creation":
                return "/Book.png";

            case "Memory Game":
                return "/Brain.png";

            default: 
                return "/notFound.png";
        }
    }

    /* returns the link route to go to when this gameButton is pressed  */
    const getLinkAddy = () => {
        switch(title) {
            case "Guess the spot":
                return("./guessspot");

            case "Picture Trivia":
                return("./picturetrivia");
                
            case "Story Creation":
                return("./storymode");
                
            case "Memory Game":
                return("./memorygame");
        }
                
    }

    /* returns the GameButton Element as a Link with a large icon and a title beneath the icon.
    When the icon or title is pressed, it will navigate to that minigame. */
    return ( 
            <Link className={"mycard"} to={getLinkAddy(title)}> 
                <image style={{backgroundImage: `url(` + getUrl() + `)`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundOrigin: "content-box", height: '20vh', width: '10vw', marginBottom: '3em', border: 0, overflow: 'hidden'}}></image>
                <p className={"text"}>{title}</p> 
            </Link>
    );
}

export default GameButton;