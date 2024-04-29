// this file contains methods that generate lists

// generates a list of all image ids in a random order 
function generateShuffledIds(numImages) {
    let imgOrder = []

    for(let i = 0; i < numImages; i++) {
        imgOrder.push(i)
    }

    shuffle(imgOrder);

    return imgOrder;
}

export default generateShuffledIds;