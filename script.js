//Pseudocode!!!
//What is our mvp?
//using the acnh api, we want to suggest an activity for the user to do.
//we want the user to pick from a set amount of questions in order to narrow down our choices of activity to a subset of activities. One activity will be randomly selected from this subset, and displayed to the user. If the user wants another activity in the same subset, they can click a button to randomly select a new activity.

//1. on initial page load, create namespace object display our questions and prompt the user for a response.

const crossingApp = {};

//query selectors
crossingApp.formEl = document.querySelector('#inputForm');
crossingApp.selectEl = document.querySelector('select');

//object to store user input

crossingApp.userInput = {};

crossingApp.init = function() {
    crossingApp.getUserInfo();
};

//2. Collect the user input into an object

crossingApp.getUserInfo = function() {
    crossingApp.formEl.addEventListener('submit', (event) => {
        event.preventDefault();

        crossingApp.userInput.personality = crossingApp.selectEl.value;
    });
};

//3. Make an api call using user input

// const url = new URL('https://acnhapi.com/v1/villagers');

// url.search = new URLSearchParams({
    
// });

console.log('script connected!')

fetch('https://acnhapi.com/v1/villagers').then( (res) => {
    return res.json();
})
.then( (jsonRes) => {
    console.log(jsonRes);
});

//4. Filter our data using user input, create a new array of possible choices

//5. randomly choose an activity from possible choices/ filtered options

//6. display the data by appending it to our html document



crossingApp.init();

//stretch goals

//add a reset button to randomly reselect a new activity with the same user input

//add from gif from giphy using the activity name

//visually increasing the tablet size of phone at end and having villager info inside