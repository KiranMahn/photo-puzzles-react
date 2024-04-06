import {Link} from 'react-router-dom';
import { View , Text, Pressable, Image } from 'react-native';
import myData from './PhotoDetails.json';
import { useState } from 'react';

const ShowStory = (chosenImagesIds) => {
    console.log("chosenImagesIds in show story: " + chosenImagesIds)
    return (
        <View>
            <Text>
                Your Story
            </Text>
        </View>

    );
}

export default ShowStory;