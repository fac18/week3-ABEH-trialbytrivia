let storageOutput;

let correctAns;

const questionGenerator = createIncrementer();

(function populateQuestion() {
  let responseQuestions;
  let xhr = new XMLHttpRequest();
  let url = "https://opentdb.com/api.php?amount=50&category=9&difficulty=medium&type=multiple&encode=base64"
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      responseQuestions = JSON.parse(xhr.responseText);
      storage(responseQuestions);
      console.log(responseQuestions);

      updateDom(responseQuestions);

    }

  };
  xhr.open("GET", url, true);
  xhr.send();
})();

function storage(data) {
  storageOutput = data
}

//
// function testQuiz() {
//   if ( )
// }


function updateDom(responseQuestions) {
  const currentQ = questionGenerator()
  const incorrect = responseQuestions.results[currentQ].incorrect_answers;
  const question = document.querySelector(".question");
  const answer1 = document.querySelector("#answer1")
  // answer1.setAttribute("style", "color:green");
  // answer1.addEventListener('click', testQuiz(bm))
  const answer2 = document.querySelector("#answer2")
  // answer2.setAttribute("style", "color:red");
  // answer2.addEventListener('click', testQuiz(bm))
  const answer3 = document.querySelector("#answer3")
  // answer3.setAttribute("style", "color:red");
  // answer3.addEventListener('click', testQuiz(bm))
  const answer4 = document.querySelector("#answer4")
  // answer4.setAttribute("style", "color:red");
  // answer4.addEventListener('click', testQuiz(bm))
  const right = document.querySelector(".answers");
  const wrong = document.querySelector(".wrong");


  question.textContent = atob(responseQuestions.results[currentQ].question);
  // console.log(incorrect);
  const correctAns = responseQuestions.results[currentQ].correct_answer;
  //  console.log(correctAns);
  const correctAndIncorrectAnswers = [correctAns, ...incorrect];
  // at this point the answers are not shuffled, all we want to do is
  // decode them, by iterating through
  let shuffledAnswers = correctAndIncorrectAnswers.map(answer => {
    return atob(answer)
  })
  // orignal array which we will not change, as we want to compare the first value
  // to what was clicked in order to check if the right answer was seleted.

  let originalFixedAnswers = shuffledAnswers.slice(0);
  // correctAns = originalFixedAnswers[0]
  console.log(originalFixedAnswers);


  shuffleArray(shuffledAnswers);

  answer1.textContent = shuffledAnswers[0];
  answer2.textContent = shuffledAnswers[1];
  answer3.textContent = shuffledAnswers[2];
  answer4.textContent = shuffledAnswers[3];


  for (let i = 0; i < shuffledAnswers.length; i++) {
    if (originalFixedAnswers[0] === shuffledAnswers[i]) {
      right.addEventListener('click', function(e) {
        right.style.backgroundColor.onclick = "green";})
        // console.log(shuffledAnswers[i]);
    } else {
      wrong.addEventListener('click', function(e) {
        wrong.style.backgroundColor.onclick = "red";})
    };
  }




  // console.log(ansSelection());
  // console.log(shuffledAnswers);

}

// function checkAns(button) {
//   if (correctAns === button.textContent) {
// button.style.backgroundColor = "green";
//   }
//   else {
//     button.style.backgroundColor = "red";
//   }
// };


// next button
const nextB = document.querySelector(".next")
nextB.addEventListener('click', function() {
  updateDom(storageOutput);
})
// prev button
const skipB = document.querySelector(".skip")
skipB.addEventListener('click', function() {
  updateDom(storageOutput);

})
