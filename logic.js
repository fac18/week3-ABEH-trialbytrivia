

// incrementer for the questions



function createIncrementer () {
    let a = 1;

 return function addOneTo () {
     return a++;
 }
}
module.exports = createIncrementer();


// random generator for answers

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}