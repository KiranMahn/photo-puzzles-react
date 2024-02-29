import './App.css';
import React from 'react';

import { View , Text, Pressable, Image } from 'react-native';
import GuessMap from './GuessMap';

export default function GuessSpot()  {
    let id =0;
    let imgLocation = "[56.6577495263809, -4.635479507522097]";
    // get rnd id
    const getRndImage = () => {
        
        //let imgLocation = blog.imageId.location;
        return './scotland.png';
    }

    return (
        <View style={{height: '100vh'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{margin: '2em', fontSize: '36px', fontWeight: 'bold'}}>&larr;</Text>
                <Text style={{textAlign: 'center', fontSize: 'xx-large', fontFamily: 'Arvo-Bold, serif', borderBottomWidth:'1px', padding: '0.5em', borderBlockColor: 'lightgray'}}> Guess the Spot </Text>
                <Pressable style={{margin: '2em'}}>
                    <Text style={{textAlign: 'center', fontSize: 'large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em'}}>Login</Text>
                </Pressable>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <View>
                    <Image source={getRndImage()} style={{width: '30vw', height: '30vw', margin: '2em'}}/>
                </View>

                <View style={{margin: '4em', alignSelf: 'end'}}>
                    <GuessMap location={imgLocation} />
                </View>
            </View>

            <View style={{position: 'absolute', bottom: 0, display: 'flex', width: '100vw', alignItems: 'flex-end'}}>
                <Pressable style={{margin: '2em'}}>
                    <Text style={{fontSize: 'x-large', margin: '1em', fontWeight: 'bold'}}>?</Text>
                </Pressable>
            </View>
            
        </View>
        

    );
  }

