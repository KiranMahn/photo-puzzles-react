import GameButton from "./GameButton";
import './App.css';


export default function Home({navigation, route}) {
    let puzzlePiece = '\u{1F9E9}';

    return ( 
        <div className={"container"}>
            <div className={"homePage"}>
                <p className={"Header"}> {puzzlePiece} Photo Puzzles</p>
                <div className={"gameButton"}>
                    <GameButton title="Guess the spot"></GameButton>
                </div>

                <div style={{display: 'flex',
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                            width: '90vw'
                            }}>
                    <div className={"gameButton"}>
                        <GameButton title="Picture Trivia"></GameButton>
                    </div>
                    <div className={"gameButton"}>
                        <GameButton title="Story Creation"></GameButton>
                    </div>
                    <div className={"gameButton"}>
                        <GameButton title="Memory Game"></GameButton>
                    </div>
                </div>

            </div>
        </div>
        
    );
}


