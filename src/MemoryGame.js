import {Link} from 'react-router-dom';
import { View, Image, Pressable, Text } from 'react-native-web';
import ReactFlipCard from 'reactjs-flip-card'
import {generateMemoryGameIds} from './utils/generator';
import myData from './PhotoDetails.json';
import { useState } from 'react';
import { useEffect } from 'react';
import JSConfetti from 'js-confetti';

// first card choice
let firstCard = "";

// second card choice
let secondCard = "";

// number of correct pair guesses in a row
let correctInARow = 0;

// total number of images being displayed in cards
let numImages = parseInt(myData["images"].length);

// create a list of shuffled image ids  
let imageOrder = generateMemoryGameIds();

// main component 
const MemoryGame = () => {
    // states 
    const [found, setFound] = useState();
    const [showInfoPanel, setShowInfoPanel] = useState(true);
    const [blur, setBlur] = useState(0.5);

    // canvas for confetti 
    const canvas = this;
    const jsConfetti = new JSConfetti({canvas});

    // a list of card objects to be displayed in a grid
    let cards = [];
    
    // information popup
    const PopUp = () => {
        // if should be shown 
        if(showInfoPanel) {
            setBlur(0.5);
            // if all have been guessed correctly 
            if(correctInARow == numImages) {
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
                                You Win!
                            </Text>
                            <Pressable onPress={() => {console.log("clicked");setShowInfoPanel(false); setBlur(1)}} 
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
            // if game not yet won show how to play information 
            else {
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
                                Select matching images. Get all the matches correct in a row to win. 
                            </Text>
                            <Pressable onPress={() => {console.log("clicked");setShowInfoPanel(false); setBlur(1)}} 
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
        } 
        // if panel not ready to be shown return nothing
        else {
            return;
        }
    }

    // set firstCard and secondCard to determine if pairs match 
    const setActiveCard = (key) => {
        // set appropriate card. If first card has not yet been set then that is the one to set
        if(firstCard.length == 0) {
            firstCard = key;
        }
        // if first card has been set then set the second card  
        else {
            secondCard = key;
        }
    
        //if both cards are set, check for match 
        if(secondCard.length !== 0) {

            // if a match is found, give a point to user and reset firstCard and secondCard, and increase the number of correct pair guesses in a row 
            if(parseInt(firstCard) === parseInt(secondCard)) {
                correctInARow++;
                firstCard = "";
                secondCard = "";
            } 
            // if not a match then reset correct in a row, reset first and second card, and flip back over cards
            else {
                setTimeout(() => {
                    setFound(false);
                }, "500");
                firstCard = "";
                secondCard = "";
                correctInARow = 0;
            }

            // reset card flipping state
            setFound(undefined);

            // if all pairs have been found consecutively then show winning screen with confetti 
            if(correctInARow == numImages) {
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
            }
        }
    }

    // generate cards 
    for(let i = 0; i < imageOrder.length; i++) {
        let src = myData["images"][imageOrder[i]]["src"];
        cards.push(
            <ReactFlipCard
                frontStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'aliceblue'}}
                backStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'aliceblue'}}
                backComponent={<img width={100} src={src} height={100} alt={""} style={{borderRadius: '20px'}}/>}
                frontComponent={<img width={100} src={'/card.png'} height={100} alt={""} style={{borderRadius: '20px'}}/>}
                flipTrigger='onClick'
                key={i}
                onClick={() => setActiveCard([imageOrder[i]])}
                flipByProp={found}
            />
        );
    }

    // main component with the header and grid of cards and info panel
    return (
        <View style={{height: '100vh', display: 'flex'}}>
            <PopUp/>
            <View style={{height: '100vh', display: 'flex', flexDirection: 'column', opacity: blur}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100vw', marginBottom: '1em'}}>
                    <View style={{margin: '1em', width: '10%'}}>
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <Text style={{fontSize: '36px', fontWeight: 'bold'}}>&larr;</Text>
                        </Link>
                    </View>
                    <Text style={{textAlign: 'center', fontSize: 'xx-large', fontFamily: 'Arvo-Bold, serif', borderBottomWidth:'1px', padding: '0.5em', borderBlockColor: 'lightgray'}}> Memory Game </Text>
                    <Pressable style={{margin: '1em', width: '10%'}}>
                        <Text style={{textAlign: 'center', fontSize: 'large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em', display: 'none'}}>Login</Text>
                    </Pressable>
                </View>
                <View style={{width: '90vw', height: '80vh', alignSelf: 'center', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center'}}>
                    {cards}
                </View>
            </View>
        </View>
    )
}

export default MemoryGame; 