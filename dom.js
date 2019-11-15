//sets variables for data
let questionsArray;
let currentQuote;
let giffySrc;
let currentAns;

const questionGenerator = createIncrementer();

//this runs on page load to get API data
(function runAPIs() {
  getQuotes();
  populateQuestion();
  getGifs();
})();

//define key dom elements as variables
const question = document.querySelector(".question");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");
const answerButtons = [answer1, answer2, answer3, answer4];
const nextB = document.querySelector(".next");

//event listener function for answer buttons
function buttonClick(event) {
  answerButtons.forEach(button => {
    button.style.pointerEvents = "none";
  });

  if (event.target.textContent == currentAns) {
    event.target.style.backgroundColor = "#58AD58";
    question.textContent = "";
    let gif = document.createElement("img");
    gif.src = giffySrc;
    question.appendChild(gif);
    question.classList.add("gif");
  } else {
    event.target.style.backgroundColor = "#B93D41";
    question.textContent = currentQuote;
    question.classList.add("insult");
  }
}

function updateDom(responseQuestions) {
  const currentQ = questionGenerator();

  //update question text in DOM
  question.textContent = atob(responseQuestions.results[currentQ].question);

  const incorrect = responseQuestions.results[currentQ].incorrect_answers;
  const correctAns = responseQuestions.results[currentQ].correct_answer;
  const correctAndIncorrectAnswers = [correctAns, ...incorrect];
  // at this point the answers are not shuffled, all we want to do is
  // decode them, by iterating through
  let shuffledAnswers = correctAndIncorrectAnswers.map(answer => {
    return atob(answer);
  });
  // orignal array which we will not change, as we want to compare the first value
  // to what was clicked in order to check if the right answer was seleted.

  let originalFixedAnswers = shuffledAnswers.slice(0);
  currentAns = originalFixedAnswers[0];

  shuffleArray(shuffledAnswers);

  answerButtons.forEach((button, index) => {
    button.addEventListener("click", buttonClick);
    button.textContent = shuffledAnswers[index];
  });
}

// next button functionality
nextB.addEventListener("click", function() {
  question.classList.remove("gif");
  answerButtons.forEach(button => {
    button.style.backgroundColor = "#ffcaca";
    button.style.pointerEvents = "auto";
  });
  question.classList.remove("insult");
  updateDom(questionsArray);
  getQuotes();
  getGifs();
});

// generic API request function
function makeApiRequest(url, cb) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      cb(xhr);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

//call api for trivia
function populateQuestion() {
  let url =
    "https://opentdb.com/api.php?amount=50&category=9&difficulty=medium&type=multiple&encode=base64";
  function setQuestion(xhr) {
    let responseQuestions = JSON.parse(xhr.responseText);
    questionsArray = responseQuestions;
    updateDom(responseQuestions);
  }
  makeApiRequest(url, setQuestion);
}

// call api for gifs
function getGifs() {
  let url =
    "https://api.giphy.com/v1/gifs/random?api_key=PD4OYNQevsMxvyBSUXjmp2Bmjnwt6fUV&tag=happy";
  function getGifSrc(xhr) {
    giffySrc = JSON.parse(xhr.responseText).data.images.downsized_large.url;
  }
  makeApiRequest(url, getGifSrc);
}

// call api for evil quotes
function getQuotes() {
  let url = "https://evilinsult.com/generate_insult.php?lang=en&type=json";
  function setQuotes(xhr) {
    let quotes = JSON.parse(xhr.responseText);
    currentQuote = quotes.insult;
  }
  makeApiRequest(url, setQuotes);
}
