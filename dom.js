   ( function () {
    let responseQuestions;
    let xhr = new XMLHttpRequest();
    let url = "https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple"
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            responseQuestions = JSON.parse(xhr.responseText);
            
            const question = document.querySelector(".question");
            question.textContent = responseQuestions.results[0].question;
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
})();


    
