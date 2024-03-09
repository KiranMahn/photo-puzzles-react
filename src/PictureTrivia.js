import './App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { View , Text, Pressable, Image } from 'react-native';
import GuessMap from './GuessMap';
import myData from './PhotoDetails.json';
import JSConfetti from 'js-confetti';
let id = 0;

let imageSrc = './scotland.png';

// choose random number
id = Math.floor(Math.random() * 9);
console.log("id: " + id);
// get image with that id

imageSrc = myData["images"][id]["src"];
console.log("imageSrc: " + imageSrc);

export default function PictureTrivia(props)  {
    console.log(myData);

    const [blur, setBlur] = useState(0.5);
    // result is true for win or false for lost
    const [result, setResult] = useState("Pending");

    // ready is true when user wins or has guess wrong 3 times in a row
    const [ready, setReady] = useState(false);

    const[score, setScore] = useState(0);
    const[src, setSrc] = useState(imageSrc);
    const canvas = this;
    const jsConfetti = new JSConfetti({canvas});

    const resetGame = () => {
        setResult("Pending");
        setReady(false);
        let nextId = Math.floor(Math.random() * 9);
        while(nextId == id) {
            nextId = Math.floor(Math.random() * 9);
        }
        id = nextId;
        
        console.log("newid:" + id);
        imageSrc = myData["images"][id]["src"];
        setSrc(imageSrc);
        console.log("imageSrc: " + imageSrc);
        console.log("clicked");
        
        setBlur(1);
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
                                }}>You Win!</Text>
                            <Text>
                               Do you want to play again?
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
                                Do you want to play again?
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
                            Answer trivia about the pictures on the left.
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
        <View style={{height: '100vh'}} onload={() => resetGame}>
            <PopUp/>
            <ResultWindow/>
            <View style={{height: '100vh', opacity:blur}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Link to="/" style={{textDecoration: 'none'}}>
                        <Text style={{margin: '2em', fontSize: '36px', fontWeight: 'bold'}}>&larr;</Text>
                    </Link>
                    
                    <Text style={{textAlign: 'center', fontSize: 'xx-large', fontFamily: 'Arvo-Bold, serif', borderBottomWidth:'1px', padding: '0.5em', borderBlockColor: 'lightgray'}}> Picture Trivia </Text>
                    <Pressable style={{margin: '2em'}}>
                        <Text style={{textAlign: 'center', fontSize: 'large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em'}}>Login</Text>
                    </Pressable>
                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center', fontSize: 'large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em', marginRight: '10%'}}>Score: {score}</Text>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <View>
                        <Image source={src} style={{width: '40vw', height: '30vw', margin: '2em'}}/>
                    </View>

                    <View style={{alignSelf: 'end', backgroundColor: 'lightgray', width: '30vw', height: '60vh', margin: '2em'}}>
                        <Text>{}</Text>
                        <View>

                        </View>
                    </View>
                </View>

                <View style={{position: 'absolute', bottom: 0, display: 'flex', width: '100vw', alignItems: 'flex-end'}}>
                    <Pressable style={{margin: '2em'}} onPress={() => {setShowInfoPanel(true); setBlur(0.5)}}>
                        <Text style={{fontSize: 'x-large', margin: '1em', fontWeight: 'bold'}}>?</Text>
                    </Pressable>
                </View>
            </View>
            
            
        </View>
        

    );
  }

