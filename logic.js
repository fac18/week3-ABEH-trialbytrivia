// incrementer for the questions

function createIncrementer() {
  let a = 1;

  return function addOneTo() {
    return a++;
  };
}

// random generator for answers

function shuffleArray(arr) {
  let newArr = arr;
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
}
if (typeof module !== "undefined") {
  module.exports = { createIncrementer, shuffleArray };
}
