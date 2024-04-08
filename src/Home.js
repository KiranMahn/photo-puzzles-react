import GameButton from "./GameButton";
import './App.css';


export default function Home({navigation, route}) {
    let puzzlePiece = '\u{1F9E9}';

    return ( 
        <div className={"container"}>
            <div className={"homePage"}>
                <p className={"Header"}> {puzzlePiece} Photo Puzzles</p>
                <div className={"gameButton"}>
                    <GameButton title="Guess the spot" navigation={navigation}></GameButton>
                </div>

                <div style={{display: 'flex',
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                            width: '90vw'
                            }}>
                    <GameButton title="Picture Trivia" navigation={navigation}></GameButton>
                    <GameButton title="Story Creation" navigation={navigation}></GameButton>
                    <GameButton title="Memory Game" navigation={navigation}></GameButton>
                </div>

            </div>
        </div>
        
    );
}


