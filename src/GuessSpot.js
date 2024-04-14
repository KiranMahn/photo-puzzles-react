import './App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { View , Text, Pressable, Image } from 'react-native';
import GuessMap from './GuessMap';
import myData from './PhotoDetails.json';
import JSConfetti from 'js-confetti';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

let id = 0;
let imgLocation = "[56.6577495263809, -4.635479507522097]";
let imageSrc = './scotland.png';
let numImages = parseInt(myData["images"].length);
console.log("numImages: " + numImages)
// choose random number

let imgOrder = []
for(let i = 0; i < numImages; i++) {
    imgOrder.push(i)
}
function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

shuffle(imgOrder);
id = imgOrder[0];
let imgIds = [id]

// get image with that id

imgLocation = myData["images"][id]["location"];
console.log("imageLocation: " + imgLocation);

imageSrc = myData["images"][id]["src"];
console.log("imageSrc: " + imageSrc);
let index = 0;
export default function GuessSpot(props)  {
    console.log(myData);
    const [blur, setBlur] = useState(0.5);
    // result is true for win or false for lost
    const [result, setResult] = useState("Pending");

    // ready is true when user wins or has guess wrong 3 times in a row
    const [ready, setReady] = useState(false);
    let imgHistory = []
    // atmp is increased with each click
    const [attmp, setAttempt] = useState(0);

    const [distance, setDistance] = useState(0);
    const[score, setScore] = useState(0);
    const[loc, setLoc] = useState(imgLocation);
    const[src, setSrc] = useState(imageSrc);
    const canvas = this;
    const jsConfetti = new JSConfetti({canvas});

    const resetGame = () => {
        setResult("Pending");
        setReady(false);
        let nextId = Math.floor(Math.random() * numImages);
        index++;
        console.log("index: " + index);
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

            
        } else {
            console.log("imgOrder: " + imgOrder)
            id = imgOrder[index];;
            imgIds.push(id);
            console.log("newid:" + id);
            imgLocation = myData["images"][id]["location"];
            setLoc(imgLocation);
            imageSrc = myData["images"][id]["src"];
            setSrc(imageSrc);
            console.log("imageSrc: " + imageSrc);
            console.log("clicked");
            setBlur(1);
            setAttempt(0);

        }
        
        
    }
    
    

    // set image url 
    // set image location 

    // get rnd id
    
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
            if(result == "Win"){
               
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
                    </View>)
                } else {
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
                            Guess where the picture was taken by selecting a point on the map. You get 3 attempts. Your guess must be within 500 miles of the photo.
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

    console.log("src: " + src);
    return (
        <View style={{height: '100vh', width: '100vw'}} onload={() => resetGame}>
            <PopUp/>
            <ResultWindow/>
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
                    <Text style={{textAlign: 'center', fontSize: 'large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em', borderBlockColor: 'lightgray'}}> Round: {imgIds.length} / {numImages}</Text>

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

