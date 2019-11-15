# week3-ABEH-trialbytrivia

## Installation manual
To start the project on your computer, you need to:

Clone the repository:

```
git clone https://github.com/fac18/week3-ABEH-trialbytrivia.git
```

Install node dependencies for testing:

npm install

NB there may be a CORS request problem related to the insult generator API.  This can be solved by using the 'Allow CORS: Access-Control-Allow-Origin'chrome plugin (and make sure it is on!)

## Objectives

* Practise making API requests
* Practise DOM manipulation
* Plan (and build!) a project's architecture


## Stretch Goals

Add score counter

## How

Spent one hour looking at a  list of free APIs and 

* Mobbing
* Pair programming


## Things we could improve
Adding the score function
Better fix for CORS issue

## Things we learnt: 
Fixing encode issues with our API server: Gillian and Ayub found two separate solutions.
Ayub created a dummy HTML element called text area and then retrieved it back out with the coding corrected.

function decode(html){
    let txt = document.createElement('textarea')
    txt.textContent = html
    return txt.value;
}

We had realised that the API offered different encoding options so we had initially tried using the base64 option. However it encoded the text in another way that was even worse.
Gillian looked into this and discovered a method called atob which used base64 but corrected the encoding!
We decided to go with the second fix but it was really interesting learn about the different fixes. 
