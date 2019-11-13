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
let url = "https://opentdb.com/api.php?amount=50&category=9&difficulty=medium&type=multiple"
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            responseQuestions = JSON.parse(xhr.responseText);
            storage(responseQuestions);
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
    const question = document.querySelector(".question");
    question.textContent = responseQuestions.results[questionGenerator()].question;
}
const nextB = document.querySelector(".next")
nextB.addEventListener('click', function(){
    // console.log(storageOutput);
updateDom(storageOutput);
})

