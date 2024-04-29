import myData from './PhotoDetails.json';
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

export {generateShuffledIds, generateMemoryGameIds};