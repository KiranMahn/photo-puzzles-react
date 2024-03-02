import './App.css';
import React, { useState } from 'react';

import { View , Text, Pressable, Image } from 'react-native';
import GuessMap from './GuessMap';

export default function GuessSpot(props)  {
    let {title, navigation} = props;
    let id =0;
    let imgLocation = "[56.6577495263809, -4.635479507522097]";
    const [blur, setBlur] = useState(0.5);
    // result is true for win or false for lost
    const [result, setResult] = useState("Pending");

    // ready is true when user wins or has guess wrong 3 times in a row
    const [ready, setReady] = useState(false);

    // atmp is increased with each click
    const [attmp, setAttempt] = useState(0);

    const [distance, setDistance] = useState(0);
    
    // get rnd id
    const getRndImage = () => {
        console.log("Blur: " + blur);
        
        //let imgLocation = blog.imageId.location;
        return './scotland.png';
    }
    const [showInfoPanel, setShowInfoPanel] = useState(true);
    const getResult = (result) => {
        setBlur(0.5);
        
    }
    const ResultWindow = () => {
        if(ready) {
            console.log("displaying result panel");
            if(result == "Win"){
                return (
                    <View style={{position: 'absolute', zIndex: 1, alignSelf: 'center', marginTop: '10%'}} onload={setBlur(0.5)}>
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
                                It took you {attmp} attemps! Do you want to play again?
                            </Text>
                            <Pressable onPress={() => {console.log("clicked");setResult("Pending");setReady(false);setBlur(1);setAttempt(0)}} 
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
            if(result == "Try"){
                return (
                    <View style={{position: 'absolute', zIndex: 1, alignSelf: 'center', marginTop: '10%'}} onload={setBlur(0.5)}>
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
                                Your guess was {distance} meters away!
                            </Text>
                            <Pressable onPress={() => {console.log("clicked");setResult("Pending");setReady(false);setBlur(1)}} 
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
                    <View style={{position: 'absolute', zIndex: 1, alignSelf: 'center', marginTop: '10%'}} onload={setBlur(0.5)}>
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
                                Your last guess was {distance} meters away! Do you want to play again?
                            </Text>
                            <Pressable onPress={() => {console.log("clicked");setResult("Pending");setReady(false);setBlur(1);setAttempt(0)}} 
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
                                      
                                }}>
                            Guess where the picture was taken by selecting a point on the map. You get 3 attempts.
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
        <View style={{height: '100vh'}}>
            <PopUp/>
            <ResultWindow/>
            <View style={{height: '100vh', opacity:blur}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{margin: '2em', fontSize: '36px', fontWeight: 'bold'}}>&larr;</Text>
                    <Text style={{textAlign: 'center', fontSize: 'xx-large', fontFamily: 'Arvo-Bold, serif', borderBottomWidth:'1px', padding: '0.5em', borderBlockColor: 'lightgray'}}> Guess the Spot </Text>
                    <Pressable style={{margin: '2em'}}>
                        <Text style={{textAlign: 'center', fontSize: 'large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em'}}>Login</Text>
                    </Pressable>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center', fontSize: 'x-large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em', borderBlockColor: 'lightgray'}}> Attempts: {attmp} </Text>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <View>
                        <Image source={getRndImage()} style={{width: '30vw', height: '30vw', margin: '2em'}}/>
                    </View>

                    <View style={{margin: '4em', alignSelf: 'end'}}>
                        <GuessMap location={imgLocation} resSetter={setResult} setReady={setReady} setAttempt={setAttempt} atmp={attmp} setDist={setDistance}/>
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

