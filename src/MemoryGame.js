import {Link} from 'react-router-dom';
import { View, Image, Pressable, Text } from 'react-native-web';
import ReactFlipCard from 'reactjs-flip-card'
import { shuffle } from './PictureTrivia';
import myData from './PhotoDetails.json';

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

const makeCards = () => {
    let allCards = [];
    let imageOrder = populateOrder();
    console.log("imageOrder: " + imageOrder)
    for(let i = 0; i < imageOrder.length; i++) {
        let src = myData["images"][imageOrder[i]]["src"];
        allCards.push(
            <ReactFlipCard
                frontStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'aliceblue'}}
                backStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'aliceblue'}}
                backComponent={<img width={100} src={src} height={100} alt={""} style={{borderRadius: '20px'}}/>}
                frontComponent={<div>front</div>}
                flipTrigger='onClick'
                key={i}
            />
        );
    }
    
    return allCards;
}


const makeGame = () => {
    let cards = makeCards();
    return (
        <View style={{width: '90vw', height: '80vh', alignSelf: 'center', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center'}}>
            {cards}
        </View>
    );
}

const MemoryGame = () => {
    let game = makeGame();
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
                {game}
            </View>
        </View>
    )
}

export default MemoryGame; 