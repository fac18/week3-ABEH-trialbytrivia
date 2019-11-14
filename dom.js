let storageOutput;

   function createIncrementer () {
       let a = 1;

    return function addOneTo () {
        return a++;
    }
   }

   const questionGenerator = createIncrementer();
   
   ( function populateQuestion () {
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

function storage(data){
storageOutput = data
}



function updateDom(responseQuestions){
    const currentQ = questionGenerator()
    const incorrect = responseQuestions.results[currentQ].incorrect_answers;
    const question = document.querySelector(".question");
    const answer1 = document.querySelector("#answer1");
    const answer2 = document.querySelector("#answer2");
    const answer3 = document.querySelector("#answer3");
    const answer4 = document.querySelector("#answer4");
    question.textContent  = atob(responseQuestions.results[currentQ].question);
    console.log(incorrect);
    const correctAns = responseQuestions.results[currentQ].correct_answer;
     console.log(correctAns);
    // const correctAndIncorrectAnswers = [correctAns, ...incorrect];
    // console.log(correctAndIncorrectAnswers);
answer1.textContent = atob(incorrect[0]);
answer2.textContent = atob(incorrect[1]);
answer3.textContent = atob(incorrect[2]);
answer4.textContent = atob(correctAns)
}


// next button
const nextB = document.querySelector(".next")
nextB.addEventListener('click', function(){
updateDom(storageOutput);
})
// prev button
const skipB = document.querySelector(".skip")
skipB.addEventListener('click',function() {
updateDom(storageOutput);

})

