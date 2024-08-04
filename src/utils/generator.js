import myData from '../PhotoDetails.json';
import shuffle from './shuffle';
import { Text, View, Pressable } from 'react-native';
// this file contains methods that generate lists

let numImages = parseInt(myData["images"].length);

// generates a list of all image ids in a random order 
function generateShuffledIds() {
    let imgOrder = []

    for(let i = 0; i < numImages; i++) {
        imgOrder.push(i)
    }

    shuffle(imgOrder);

    return imgOrder;
}

// generates a list of ids for the memory game. the returned list contains each id twice and shuffled eg. generating for a list of 3 images will return [2,1,0,2,0,1]  
function generateMemoryGameIds() {
    let imageOrder = []
    for(let i = 0; i < numImages; i++) {
        imageOrder.push(i);
        imageOrder.push(i);
    }
    shuffle(imageOrder);
    return imageOrder;
}

// generate a popup with a title, body, and buttonTxt parameters and return the JSX custom popup element 
// props: { title, body, buttonTxt, onclickFunctions }
function GeneratePopup(props) {

    const handleClick = () => {
        // deconstructedFunction is a function in the format of a tuple where 
        // example: (console.log, "clicked"), (setShowInfoPanel, false), (setBlur, 1)
        // purpose: to deconstruct functions to prevent them being  called until the button is pressed

        for(let i = 0; i < props.onclickFunctions.length; i++) {
            let method = props.onclickFunctions[i][0]
            let paras = props.onclickFunctions[i][1]
            method(paras);
        }
    }

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
                    }}>{props.title}</Text>
                <Text style={{fontFamily: 'Arvo-Bold', 
                            color: 'gray',
                            width: '70%',
                            textAlign: 'center',
                            letterSpacing: 1,
                            
                        }}>
                    {props.body}
                </Text>
                <Pressable 
                    onPress={handleClick} 
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
                    }}>{props.buttonTxt}</Text>
                </Pressable>
            </View> 
        </View>
    );

} 




export {generateShuffledIds, generateMemoryGameIds, GeneratePopup};