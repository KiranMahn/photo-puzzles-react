import {Link} from 'react-router-dom';
import { View, Image, Pressable, Text } from 'react-native-web';
import ReactFlipCard from 'reactjs-flip-card'
import { shuffle } from './PictureTrivia';
import myData from './PhotoDetails.json';
import { useState } from 'react';

let firstCard = "";
let secondCard = "";


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
    let cards = [];
    


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
            }
            setFound(undefined);
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
            <View style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
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