import {Link} from 'react-router-dom';
import { View, Image, Pressable, Text } from 'react-native-web';
import ReactFlipCard from 'reactjs-flip-card'
import { shuffle } from './PictureTrivia';
import myData from './PhotoDetails.json';
import { useState } from 'react';
import { useEffect } from 'react';
import JSConfetti from 'js-confetti';

let firstCard = "";
let secondCard = "";
let correctInARow = 0;

const populateOrder = () => {
    let imageOrder = []
    for(let i = 0; i < 9; i++) {
        imageOrder.push(i);
        imageOrder.push(i);
    }
    shuffle(imageOrder);
    shuffle(imageOrder);
    return imageOrder;
}

let imageOrder = populateOrder();
console.log("imageOrder: " + imageOrder);



const MemoryGame = () => {
    const [found, setFound] = useState();
    const [showInfoPanel, setShowInfoPanel] = useState(true);
    const [blur, setBlur] = useState(0.5);
    const canvas = this;
    const jsConfetti = new JSConfetti({canvas});
    let cards = [];
    

    const PopUp = () => {
        if(showInfoPanel) {
            setBlur(0.5);
            if(correctInARow == 9) {
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

            } else {
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
        } else {
            return;
        }
    }


    const setActiveCard = (key) => {
        // set appropriate card
        if(firstCard.length == 0) {
            firstCard = key;
        } else {
            secondCard = key;
        }
    
        console.log("firstCard: ." + firstCard + ".");
        console.log("secondCard: ." + secondCard + ".");
        //if second card is being set, check for match 
        if(secondCard.length !== 0) {
            console.log("comparing...")
            if(parseInt(firstCard) === parseInt(secondCard)) {
                console.log("you get a point!!");
                correctInARow++;
                firstCard = "";
                secondCard = "";
                // temp.push(firstCard);
            } else {
                //flip back cards
                console.log("wrong")
                setTimeout(() => {
                    setFound(false);
                }, "500");
                firstCard = "";
                secondCard = "";
                correctInARow = 0;
            }
            setFound(undefined);
            if(correctInARow == 9) {
                console.log("you win")
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
                        <Text style={{textAlign: 'center', fontSize: 'large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em'}}>Login</Text>
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