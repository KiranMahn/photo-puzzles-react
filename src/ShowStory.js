
import {Carousel} from 'react-bootstrap';
import { View, Image, Pressable, Text } from 'react-native-web';
import myData from './PhotoDetails.json';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const generateCaroselItems = (chosenImageIds) => {
  let len = chosenImageIds["chosenImagesIds"].length;
  console.log("chosenImageIds: ", chosenImageIds["chosenImagesIds"])
  console.log("chosenImageIds length: ", len)
  let items = [];
  for(let i = 0; i < len; i++) {
    console.log("current chosenImageIds: ", chosenImageIds[i])
    let prompt = "";
    if(i == 0) {
      prompt = myData["images"][chosenImageIds["chosenImagesIds"][i]]["story"]["start"]
    } else if(i == len-1) {
      prompt = myData["images"][chosenImageIds["chosenImagesIds"][i]]["story"]["end"]
    } else {
      prompt = myData["images"][chosenImageIds["chosenImagesIds"][i]]["story"]["middle"]
    }
    prompt = prompt.replace("Name1", "Luna");
    prompt = prompt.replace("Name2", "Casper");

    items.push(
      <Carousel.Item style={{width: '100vw', height: '100vh', padding: '1em', display: 'flex', justifyContent: 'center'}} key={i}>
          <Image source={myData["images"][chosenImageIds["chosenImagesIds"][i]]["src"]} style={{width: '100vw', height: '90vw', alignSelf: 'center', margin: '1em'}}/>
          <Carousel.Caption style={{backgroundColor: 'rgb(0,0,0,50%)', borderRadius: '3.5em'}}>
            {/* <h3>First slide label</h3> */}
            <p style={{padding: '1em', fontFamily: 'Arvo-Bold, serif'}}>{prompt}</p>
          </Carousel.Caption>
      </Carousel.Item>
    );
  }
  return (
    items
  );

}

const ShowStory = (chosenImageIds) => {

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  let items = generateCaroselItems(chosenImageIds);
  return (
    <View style={{width: '100vw', height: '100vh', backgroundColor: 'coral'}}>
      <Link to="/" style={{textDecoration: 'none', position: 'absolute', fontSize: 'large', top: 0, right: 0, width: 50, height: 50, zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3.5em', margin: '1em'}}>
        <Text style={{fontFamily: 'Arvo-Bold, serif',fontWeight: 'bold',fontSize: 'x-large', color: 'white'}}>X</Text>
      </Link>
      <Carousel fade activeIndex={index} onSelect={handleSelect} style={{width: '100vw', height: '100vh'}}>
        {items}
      </Carousel>
    </View>
    
  );
}

export default ShowStory;