import './App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { View , Text, Pressable, Image } from 'react-native';
import GuessMap from './GuessMap';
import myData from './PhotoDetails.json';
import JSConfetti from 'js-confetti';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import shuffle from './utils/shuffle';
import generateShuffledIds from './utils/generator';
/* Guess spot is a geoguesser */

// id and index of current image
let id = 0;
let index = 0;

// coordiantes of current image
let imgLocation = "[56.6577495263809, -4.635479507522097]";

// url of current image
let imageSrc = './scotland.png';

// number of images to be cycled through 
let numImages = parseInt(myData["images"].length);

// create a random order to display all the iamges 
let imgOrder = generateShuffledIds(numImages);

// set id to first image to be displayed 
id = imgOrder[0];

// get image with that id
imgLocation = myData["images"][id]["location"];
imageSrc = myData["images"][id]["src"];

export default function GuessSpot(props)  {
    // states
    const [blur, setBlur] = useState(0.5);
    const [result, setResult] = useState("Pending");
    const [ready, setReady] = useState(false);
    const [attmp, setAttempt] = useState(0);
    const [showInfoPanel, setShowInfoPanel] = useState(true);
    const [distance, setDistance] = useState(0);
    const [score, setScore] = useState(0);
    const [loc, setLoc] = useState(imgLocation);
    const [src, setSrc] = useState(imageSrc);

    // canvas is for displaying confetti
    const canvas = this;
    const jsConfetti = new JSConfetti({canvas});

    // resets the game after each ROUND 
    const resetGame = () => {
        // set game state as pending 
        setResult("Pending");

        // do not show popup yet 
        setReady(false);

        // increase index
        index++;

        // if gone through all images show winning screen with confetti 
        if(index == numImages) {
            setResult("over");
            setReady(true);
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
        // if there are still images to go then set the next round
        } else {
            // update id, coordinates, location, and url
            id = imgOrder[index];
            imgLocation = myData["images"][id]["location"];
            setLoc(imgLocation);
            imageSrc = myData["images"][id]["src"];
            setSrc(imageSrc);

            // deblur background and reset attempts 
            setBlur(1);
            setAttempt(0);
        }  
    }

    // will make everything behind the result window semi-opaque 
    const blurBackground = () => {
        setBlur(0.5);
    }

    const ResultWindow = () => {
        // if result window is ready to be shown
        if(ready) {
            // if user has won that round
            if(result == "Win"){
                // if on first attempt 
                if(attmp == 1) {
                    return(
                        <View style={{position: 'absolute', zIndex: 1, alignSelf: 'center', marginTop: '10%'}} onload={blurBackground()}>
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
                                    }}>Correct!</Text>
                                <Text>
                                    It took you {attmp} attempt! Try another round!
                                </Text>
                                <Pressable onPress={() => {resetGame();}} 
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
                                    }}>Play Again</Text>
                                </Pressable>
                            </View> 
                        </View>
                    )
                } 
                // if on 2nd or 3rd attempt 
                else {
                    return (
                        <View style={{position: 'absolute', zIndex: 1, alignSelf: 'center', marginTop: '10%'}} onload={blurBackground()}>
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
                                    }}>Correct!</Text>
                                <Text>
                                    It took you {attmp} attempts! Try another round!
                                </Text>
                                <Pressable onPress={() => {resetGame();}} 
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
                                    }}>Play Again</Text>
                                </Pressable>
                            </View> 
                        </View>
                    );
                }
            }

            // if user has more attempts 
            if(result == "Try"){
                return (
                    <View style={{position: 'absolute', zIndex: 1, alignSelf: 'center', marginTop: '10%'}} onload={blurBackground()}>
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
                                }}>Try Again!</Text>
                            <Text>
                                Your guess was {distance} miles away!
                            </Text>
                            <Pressable onPress={() => {setReady(false); setBlur(1)}} 
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
                                }}>Try Again</Text>
                            </Pressable>
                        </View> 
                    </View>
                );

            }

            // if user has lost that round
            if(result == "Lost"){
                return (
                    <View style={{position: 'absolute', zIndex: 1, alignSelf: 'center', marginTop: '10%'}} onload={blurBackground()}>
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
                                }}>You Lost!</Text>
                            <Text>
                                Your last guess was {distance} miles away! Do you want to play again?
                            </Text>
                            <Pressable onPress={() => {resetGame();}} 
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
                                }}>Play Again</Text>
                            </Pressable>
                        </View> 
                    </View>
                );
            }

            // if the game is over
            if(result == "over"){
                return (
                    <View style={{position: 'absolute', zIndex: 1, alignSelf: 'center', marginTop: '10%'}} onload={blurBackground()}>
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
                                }}>Game Over!</Text>
                            <Text>
                                Total Score: {score} / {numImages}
                            </Text>

                        </View> 
                    </View>
                );
            }
            
        }
        // if result window is not ready to be returned then return nothing
        else {
            return;
        }
    }

    const PopUp = () => {
        // if information panel is ready to be shown then return the popup
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
                            Guess where the picture was taken by selecting a point on the map. You get 3 attempts. Your guess must be within 500 miles of the photo.
                        </Text>
                        <Pressable onPress={() => {setShowInfoPanel(false);setBlur(1);}} 
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
        } 
        // if information panel should not be shown then return nothing
        else {
            return;
        }
    }

    // return the main component 
    return (
        <View style={{height: '100vh', width: '100vw'}} onload={() => resetGame}>
            {<PopUp/>}
            {<ResultWindow/>}
            <View style={{height: '100vh', opacity:blur}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{margin: '1em', width: '10%'}}>
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <Text style={{fontSize: '36px', fontWeight: 'bold'}}>&larr;</Text>
                        </Link>
                    </View>
                    
                    <Text style={{textAlign: 'center', fontSize: 'xx-large', fontFamily: 'Arvo-Bold, serif', borderBottomWidth:'1px', padding: '0.5em', borderBlockColor: 'lightgray'}}> Guess the Spot </Text>
                    <Pressable style={{margin: '1em', width: '10%'}}>
                        <Text style={{textAlign: 'center', fontSize: 'large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em', display: 'none'}}>Login</Text>
                    </Pressable>
                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <Text style={{textAlign: 'center', fontSize: 'large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em'}}>Score: {score}</Text>
                    <Text style={{textAlign: 'center', fontSize: 'large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em', borderBlockColor: 'lightgray'}}> Attempts: {attmp} </Text>
                    <Text style={{textAlign: 'center', fontSize: 'large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em', borderBlockColor: 'lightgray'}}> Round: {index + 1} / {numImages}</Text>

                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <View>
                        <LazyLoadImage alt={"This site is not yet friendly to the blind"} effect="blur" src={src} style={{width: '40vw', height: '30vw', margin: '2em'}}/>
                    </View>

                    <View style={{margin: '4em', alignSelf: 'end'}}>
                        <GuessMap location={loc} resSetter={setResult} setReady={setReady} setAttempt={setAttempt} atmp={attmp} setDist={setDistance} setScore={setScore} score={score}/>
                    </View>
                </View>

                
            </View>
            
            <View style={{position: 'absolute', bottom: 0, right: -20, display: 'flex', width: '100vw', alignItems: 'flex-end'}}>
                <Pressable style={{margin: '2em'}} onPress={() => {setShowInfoPanel(true); setBlur(0.5)}}>
                    <Text style={{fontSize: 'x-large', margin: '1em', fontWeight: 'bold'}}>?</Text>
                </Pressable>
            </View>
        </View>
    );
  }

