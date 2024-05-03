import './App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { View , Text, Pressable, Image } from 'react-native';
import GuessMap from './GuessMap';
import myData from './PhotoDetails.json';
import JSConfetti from 'js-confetti';
import Quiz from './Quiz';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import shuffle from './utils/shuffle';
import {GeneratePopup, generateShuffledIds} from './utils/generator';

let imgIds;
let imgOrder;
let id = 0;
let idIndex = 0;
let imgLocation = "[56.6577495263809, -4.635479507522097]";
let imageSrc = './scotland.png';
let numImages = parseInt(myData["images"].length);

// choose random number
id = Math.floor(Math.random() * numImages);
imgIds = [id]

// create a random image order 
imgOrder = generateShuffledIds(numImages);

// set current id to the first in the list of random images 
id = imgOrder[0];

// get image and location with that id
imgLocation = myData["images"][id]["location"];
imageSrc = myData["images"][id]["src"];

// the picture trivia game 
const PictureTrivia = (props) => {

    const [blur, setBlur] = useState(0.5);
    const [currId, setCurrId] = useState(id);
    // result is true for win or false for lost
    const [result, setResult] = useState("Pending");
    // ready is true when user wins or has guess wrong 3 times in a row
    const [ready, setReady] = useState(false);
    let imgHistory = []
    // atmp is increased with each click
    const [attmp, setAttempt] = useState(0);
    const [reset, setReset] = useState(false);
    const [distance, setDistance] = useState(0);
    const[score, setScore] = useState(0);
    const[loc, setLoc] = useState(imgLocation);
    const canvas = this;
    const jsConfetti = new JSConfetti({canvas});
    // imageSrc = myData["images"][currId]["src"];
    const [src, setSrc] = useState(myData["images"][currId]["src"]);

    // called at start of game and to view results 
    const resetGame = () => {
        setReset(true);
        setResult("Pending");
        setReady(false);
        idIndex = 0;
        // choose random number
        id = Math.floor(Math.random() * numImages);
        let imgOrder = []
        for(let i = 0; i < numImages; i++) {
            imgOrder.push(i)
        }
        shuffle(imgOrder);
        id = imgOrder[0];
        // get image with that id

        imgLocation = myData["images"][id]["location"];
        console.log("imageLocation: " + imgLocation);

        imageSrc = myData["images"][id]["src"];
        console.log("imageSrc: " + imageSrc);
        setBlur(1);
        setAttempt(0);
    }

    const [showInfoPanel, setShowInfoPanel] = useState(true);

    const getResult = (result) => {
        setBlur(0.5);
        
    }

    const blurBackground = () => {
        setBlur(0.5);
    }

    const ResultWindow = () => {
        if(ready) {
            console.log("displaying result panel");
            blurBackground();
            if(result == "Win"){
                jsConfetti.addConfetti({
                    emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
                 })
                 jsConfetti.addConfetti({
                    confettiRadius: 6,
                  })
                  jsConfetti.addConfetti({
                    confettiRadius: 6,
                    confettiNumber: 500,
                  })
                return (
                    <GeneratePopup title="You Win!" body="Do you wish to view your results?" buttonTxt="View Results" onclickFunctions={[[resetGame, ""], [setShowInfoPanel, false], [setBlur, 1]]} />
                );
            }
            if(result == "Lost"){
                return (
                    <GeneratePopup title="You Lost!" body="Do you wish to view your results?" buttonTxt="View Results" onclickFunctions={[[resetGame, ""], [setShowInfoPanel, false], [setBlur, 1]]} />
                );
            }
            
        }else {
            return;
        }
    }

    const PopUp = () => {
        if(showInfoPanel) {
            return (
                <View style={{position: 'absolute', zIndex: 1, alignSelf: 'center', marginTop: '10%'}}>
                    <View style={{
                        width: '50vw',
                        height: '30vh', 
                        backgroundColor: 'oldlace', 
                        justifyContent: 'space-evenly', 
                        alignItems: 'center',
                        borderRadius: 25,
                        border: '3px solid moccasin'
                        }}>
                        <Text style={{
                                fontFamily: 'Arvo-Bold, serif',
                                fontWeight: 'bold',
                                fontSize: 'x-large'
                            }}>How to Play</Text>
                        <Text style={{fontFamily: 'Arvo-Bold', 
                                      color: 'gray',
                                      width: '70%',
                                      textAlign: 'center',
                                      letterSpacing: 1,
                                      
                                }}>
                            Answer the trivia questions related to the photos on the left. You only get one attempt at each question. Each question is worth 5 points. Get {((parseInt(numImages/2)) + 2)}/{numImages} correct to win!
                        </Text>
                        <Pressable onPress={() => {console.log("clicked");setShowInfoPanel(false);setBlur(1);}} 
                            style={{
                                width: '20%',
                                height: '15%',
                                backgroundColor: 'moccasin',
                                borderRadius: '15px',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text style={{
                                fontFamily: 'Arvo-Bold, serif',
                                fontWeight: 'bold'
                            }}>Close Me</Text>
                        </Pressable>
                    </View> 
                </View>
            );
        } else {
            return;
        }
    }

    return (
        <View style={{height: '100vh', width: '100vw', display: 'flex'}} onload={() => resetGame}>
            <PopUp/>
            <ResultWindow/>
            <View style={{height: '100vh', opacity:blur}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{margin: '1em', width: '10%'}}>
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <Text style={{fontSize: '36px', fontWeight: 'bold'}}>&larr;</Text>
                        </Link>
                    </View>
                    
                    <Text style={{textAlign: 'center', fontSize: 'xx-large', fontFamily: 'Arvo-Bold, serif', borderBottomWidth:'1px', padding: '0.5em', borderBlockColor: 'lightgray'}}> Picture Trivia </Text>
                    <Pressable style={{margin: '1em', width: '10%'}}>
                        <Text style={{textAlign: 'center', fontSize: 'large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em', display: 'none'}}>Login</Text>
                    </Pressable>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
                    <View>
                        <LazyLoadImage effect="blur" src={myData["images"][currId]["src"]} style={{width: '40vw', height: '30vw', margin: '2em'}}/>
                    </View>

                    <View style={{margin: 2, alignSelf: 'end'}}>
                        <Quiz id={id} imgOrder={imgOrder} setCurrId={setCurrId} setReady={setReady} setResult={setResult} result={result} reset={reset} setReset={setReset}/>
                    </View>
                </View>

                
            </View>
            <View style={{position: 'absolute', bottom: 0, right: 0, display: 'flex', alignItems: 'flex-end'}}>
                <Pressable style={{margin: '2em'}} onPress={() => {setShowInfoPanel(true); setBlur(0.5)}}>
                    <Text style={{fontSize: 'x-large', margin: '1em', fontWeight: 'bold'}}>?</Text>
                </Pressable>
            </View>
            
        </View>
        

    );
  }

export default PictureTrivia;
export {shuffle};