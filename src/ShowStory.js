
import {Carousel} from 'react-bootstrap';
import { View, Image } from 'react-native-web';
import myData from './PhotoDetails.json';
import { useState } from 'react';

const generateCaroselItems = () => {
  let items = [];
  for(let i = 0; i < 9; i++) {
    items.push(
      <Carousel.Item style={{width: '100vw', height: '100vh', padding: '1em', display: 'flex', justifyContent: 'center'}} key={i}>
          <Image source={myData["images"][i]["src"]} style={{width: '100vw', height: '90vw', alignSelf: 'center', margin: '1em'}}/>
          <Carousel.Caption style={{backgroundColor: 'rgb(0,0,0,50%)'}}>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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

  let items = generateCaroselItems();
  return (
    <View style={{width: '100vw', height: '100vh', backgroundColor: 'coral'}}>
      <Carousel fade activeIndex={index} onSelect={handleSelect} style={{width: '100vw', height: '100vh'}}>
        {items}
      </Carousel>
    </View>
    
  );
}

export default ShowStory;