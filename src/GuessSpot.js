import './App.css';
import React, { useState } from 'react';

import { View , Text, Pressable, Image } from 'react-native';
import GuessMap from './GuessMap';
export default function GuessSpot()  {
    let id =0;
    let imgLocation = "[56.6577495263809, -4.635479507522097]";
    const [blur, setBlur] = useState(0.5);
    const [result, setResult] = useState(false);
    const [ready, setReady] = useState(false);
    // get rnd id
    const getRndImage = () => {
        console.log("Blur: " + blur);
        
        //let imgLocation = blog.imageId.location;
        return './scotland.png';
    }
    const [showInfoPanel, setShowInfoPanel] = useState(true);
    const getResult = (result) => {
        if(result) {
            console.log("winner")
            return "Win!";
        } else {
            console.log("loser")
            return "Lose!";
        }
    }
    const ResultWindow = () => {
        if(ready) {
            console.log("displaying result panel");
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
                            }}>You {getResult(result)}</Text>
                        <Text>
                            Do you want to play again?
                        </Text>
                        <Pressable onPress={() => {console.log("clicked");setResult(false);setReady(false);setBlur(1)}} 
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
                        <Text>
                            Guess where the picture was taken by selecting a point on the map.
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

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <View>
                        <Image source={getRndImage()} style={{width: '30vw', height: '30vw', margin: '2em'}}/>
                    </View>

                    <View style={{margin: '4em', alignSelf: 'end'}}>
                        <GuessMap location={imgLocation} resSetter={setResult} setReady={setReady}/>
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

