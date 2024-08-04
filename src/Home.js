import GameButton from "./GameButton";
import './App.css';
import { Link } from "react-router-dom";
/* This is the first page that App.js displays. From here you can navigate to all the miniGames */

export default function Home() {

    // puzzle piece emoji icon used in title
    let puzzlePiece = '\u{1F9E9}';

    // main component with a title and 4 miniGame gameButtons 
    return ( 
        <div className={"container"}>
            <div className={"homePage"}>
                <div style={{display: 'flex', flexDirection: 'row', width: '100vw', justifyContent: 'center'}}>
                    <p className={"Header"}> {puzzlePiece} Photo Puzzles</p>
                </div>
                
                <div className={"gameButton"}>
                    <GameButton title="Guess the spot"></GameButton>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'row', width: '90vw'}}>

                    <div className={"gameButton"}>
                        <GameButton title="Picture Trivia"/>
                    </div>

                    <div className={"gameButton"}>
                        <GameButton title="Story Creation"/>
                    </div>

                    <div className={"gameButton"}>
                        <GameButton title="Memory Game"/>
                    </div>

                </div>

            </div>
        </div>
        
    );
}


