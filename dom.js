let storageOutput;
let currentQuote;
let giffySrc;

const questionGenerator = createIncrementer();

(function runAPIs() {
  getQuotes();
  populateQuestion();
  getGifs();
})();

function populateQuestion() {
  let responseQuestions;
  let xhr = new XMLHttpRequest();
  let url =
    "https://opentdb.com/api.php?amount=50&category=9&difficulty=medium&type=multiple&encode=base64";
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
}

function storage(data) {
  storageOutput = data;
}

function updateDom(responseQuestions) {
  const currentQ = questionGenerator();
  const incorrect = responseQuestions.results[currentQ].incorrect_answers;
  const question = document.querySelector(".question");
  const answer1 = document.querySelector("#answer1");
  const answer2 = document.querySelector("#answer2");
  const answer3 = document.querySelector("#answer3");
  const answer4 = document.querySelector("#answer4");
  // const right = document.querySelector(".right");
  // const wrong = document.querySelector(".wrong");

  question.textContent = atob(responseQuestions.results[currentQ].question);
  // console.log(incorrect);
  const correctAns = responseQuestions.results[currentQ].correct_answer;
  //  console.log(correctAns);
  const correctAndIncorrectAnswers = [correctAns, ...incorrect];
  // at this point the answers are not shuffled, all we want to do is
  // decode them, by iterating through
  let shuffledAnswers = correctAndIncorrectAnswers.map(answer => {
    return atob(answer);
  });
  // orignal array which we will not change, as we want to compare the first value
  // to what was clicked in order to check if the right answer was seleted.

  let originalFixedAnswers = shuffledAnswers.slice(0);
  // correctAns = originalFixedAnswers[0]

  shuffleArray(shuffledAnswers);

  answer1.textContent = shuffledAnswers[0];
  answer2.textContent = shuffledAnswers[1];
  answer3.textContent = shuffledAnswers[2];
  answer4.textContent = shuffledAnswers[3];

  answer1.addEventListener("click", function() {
    answer2.style.pointerEvents = "none";
    answer3.style.pointerEvents = "none";
    answer4.style.pointerEvents = "none";

    if (answer1.textContent == originalFixedAnswers[0]) {
      answer1.style.backgroundColor = "green";
      question.textContent = "";
    } else {
      answer1.style.backgroundColor = "red";
      question.textContent = currentQuote;
      question.classList.add("insult");
    }
  });

  answer2.addEventListener("click", function() {
    answer1.style.pointerEvents = "none";
    answer3.style.pointerEvents = "none";
    answer4.style.pointerEvents = "none";

    if (answer2.textContent == originalFixedAnswers[0]) {
      answer2.style.backgroundColor = "green";
      question.textContent = "";
    } else {
      answer2.style.backgroundColor = "red";
      question.textContent = currentQuote;
      question.classList.add("insult");
    }
  });

  answer3.addEventListener("click", function() {
    answer1.style.pointerEvents = "none";
    answer2.style.pointerEvents = "none";
    answer4.style.pointerEvents = "none";

    if (answer3.textContent == originalFixedAnswers[0]) {
      answer3.style.backgroundColor = "green";
      question.textContent = "";
    } else {
      answer3.style.backgroundColor = "red";
      question.textContent = currentQuote;
      question.classList.add("insult");
    }
  });

  answer4.addEventListener("click", function() {
    answer1.style.pointerEvents = "none";
    answer2.style.pointerEvents = "none";
    answer3.style.pointerEvents = "none";

    if (answer4.textContent == originalFixedAnswers[0]) {
      answer4.style.backgroundColor = "green";
      question.textContent = "";
    } else {
      answer4.style.backgroundColor = "red";
      question.textContent = currentQuote;
      question.classList.add("insult");
    }
  });
}

// next button
const nextB = document.querySelector(".next");
nextB.addEventListener("click", function() {
  updateDom(storageOutput);

  answer1.style.backgroundColor = "#ffcaca";
  answer2.style.backgroundColor = "#ffcaca";
  answer3.style.backgroundColor = "#ffcaca";
  answer4.style.backgroundColor = "#ffcaca";
  answer1.style.pointerEvents = "auto";
  answer2.style.pointerEvents = "auto";
  answer3.style.pointerEvents = "auto";
  answer4.style.pointerEvents = "auto";
  question.classList.remove("insult");
  
  getQuotes();
  getGifs();
});

// api for evil quotes

function getQuotes() {
  let quotes;
  let xhr = new XMLHttpRequest();

  // let url = "https://cors-anywhere.herokuapp.com/https://evilinsult.com/generate_insult.php?lang=en&type=json"
  let url = "https://evilinsult.com/generate_insult.php?lang=en&type=json";
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      quotes = JSON.parse(xhr.responseText);
      currentQuote = quotes.insult;

      console.log(currentQuote);

    }
  };
  xhr.open("GET", url, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.responseType = "text/html";
  xhr.send();
}

function getGifs() {
  let xhr = new XMLHttpRequest();

  let url =
    "https://api.giphy.com/v1/gifs/random?api_key=PD4OYNQevsMxvyBSUXjmp2Bmjnwt6fUV&tag=happy";
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      giffySrc = JSON.parse(xhr.responseText).data.images.downsized_large.url;
      console.log(giffySrc);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
