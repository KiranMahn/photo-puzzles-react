import {Link} from 'react-router-dom';
import { View , Text, Pressable, Image } from 'react-native';
import myData from './PhotoDetails.json';
import { useState } from 'react';
import JSConfetti from 'js-confetti';
import ShowStory from './ShowStory';

const resetGame = () => {
    return 0;
}
let imgLocation = "[56.6577495263809, -4.635479507522097]";
let idIndex = 0;
let numImages = 9;

const StoryMode = () => {
    const [chosenImagesIds, setchosenImagesIds] = useState([]);
    const [idIndex, setIdIndex] = useState(0);
    console.log(myData);
    const [blur, setBlur] = useState(0.5);
    const [currId, setCurrId] = useState(0);
    // result is true for win or false for lost
    const [result, setResult] = useState("Pending");
    // ready is true when user wins or has guess wrong 3 times in a row
    const [ready, setReady] = useState(false);
    let imgHistory = []
    // atmp is increased with each click
    const [attmp, setAttempt] = useState(0);
    const [reset, setReset] = useState(false);
    const [distance, setDistance] = useState(0);
    const[score, setScore] = useState(0);
    const[loc, setLoc] = useState(imgLocation);
    const canvas = this;
    const jsConfetti = new JSConfetti({canvas});
    const [showInfoPanel, setShowInfoPanel] = useState(true);
    const [chosenImages, setChosenImages] = useState([]);
    // imageSrc = myData["images"][currId]["src"];
    const [src, setSrc] = useState(myData["images"][currId]["src"]);
    const [prompt, setPrompt] = useState("Choose your starting image");
    const [showStory, setShowStory] = useState(false);
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
    const addImage = (id) => {
        setPrompt("Choose the next image for your story")
        console.log("adding image with id: " + imgOrder[id]);
        let ids = chosenImagesIds;
        ids.push(imgOrder[id]);
        setchosenImagesIds(ids);
        console.log("chosenImagesIds: " + chosenImagesIds)
        let temp = chosenImages;
        temp.push(
            <Image source={myData["images"][id]["src"]} style={{width: 150, height: 100, margin: '2em'}} key={id}/>
        );
        setChosenImages(temp)
        if((idIndex + 3) < 9) {
            setIdIndex(idIndex + 2);
            console.log("idIndex under 9, currently: " + idIndex)
        }
        else {
            console.log("idIndex above 9, currently: " + idIndex)
            setShowStory(true);
            // setShowInfoPanel(true)
            setIdIndex(0)
        }
    }
    const PopUp = () => {
        if(showInfoPanel) {
            setBlur(0.5);
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
                            Choose which picture to go next in your story by clicking on a photo. 
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
            return;
        }
    }
    return (
        <View style={{height: '100vh', display: 'flex'}} onload={() => resetGame}>
            <PopUp/>
            {showStory && <ShowStory chosenImagesIds={chosenImagesIds}/>}
            {!showStory && 
            <View style={{height: '100vh', display: 'flex', flexDirection: 'column', opacity: blur}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{margin: '1em', width: '10%'}}>
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <Text style={{fontSize: '36px', fontWeight: 'bold'}}>&larr;</Text>
                        </Link>
                    </View>
                    
                    
                    <Text style={{textAlign: 'center', fontSize: 'xx-large', fontFamily: 'Arvo-Bold, serif', borderBottomWidth:'1px', padding: '0.5em', borderBlockColor: 'lightgray'}}> Story Mode </Text>
                    <Pressable style={{margin: '1em', width: '10%'}}>
                        <Text style={{textAlign: 'center', fontSize: 'large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em'}}>Login</Text>
                    </Pressable>
                </View>
                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{textAlign: 'center', fontSize: 'small', fontFamily: 'Arvo-Bold, serif', padding: '0.5em', color: 'gray', marginTop: '1em'}}> {prompt} </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100vw', backgroundColor: 'floralwhite'}}>
                    {chosenImages}
                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
                    <Pressable style={{margin: '2em'}} onPress={() => {addImage(imgOrder[idIndex]); }}>
                        <Image source={myData["images"][imgOrder[idIndex]]["src"]} style={{width: '35vw', height: '20vw'}}/>
                    </Pressable>
                    <Pressable style={{margin: '2em'}} onPress={() => {addImage(imgOrder[idIndex + 1]); }}>
                        <Image source={myData["images"][imgOrder[idIndex + 1]]["src"]} style={{width: '35vw', height: '20vw'}}/>
                    </Pressable>
                </View>

                <View style={{position: 'absolute', bottom: 0, display: 'flex', width: '100%', alignItems: 'flex-end'}}>
                    <Pressable onPress={() => {setShowInfoPanel(true); }}>
                        <Text style={{fontSize: 'x-large', margin: '0.5em', fontWeight: 'bold'}}>?</Text>
                    </Pressable>
                </View>
            </View>}
            
            
        </View>
        

    );
}

export default StoryMode; 