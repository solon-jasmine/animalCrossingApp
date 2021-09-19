//Pseudocode!!!
//What is our mvp?
//using the acnh api, we want to suggest an activity for the user to do.
//we want the user to pick from a set amount of questions in order to narrow down our choices of activity to a subset of activities. One activity will be randomly selected from this subset, and displayed to the user. If the user wants another activity in the same subset, they can click a button to randomly select a new activity.

//1. on initial page load, create namespace object display our questions and prompt the user for a response.

const crossingApp = {};

//query selectors
crossingApp.formEl = document.querySelector('#inputForm');
crossingApp.selectPer = document.querySelector('#personality');
crossingApp.selectSpe = document.querySelector('#species');

//object to store user input
crossingApp.userInput = {};

//object to store filtered data (what villagers match our conditions)
crossingApp.possibleVillagers = [];

//get our api data first
//set our event listener for submit
//get user input from submit
//filter our results from user input
crossingApp.init = function() {
    crossingApp.getData();
};

//2. Collect the user input into an object

crossingApp.getUserInfo = function() {
    crossingApp.formEl.addEventListener('submit', (event) => {
        event.preventDefault();
        //selects checked input and saves value
        crossingApp.selectGen = document.querySelector('input[name="gender"]:checked');
        
        //saves user input into userInput object
        crossingApp.userInput.personality = crossingApp.selectPer.value;
        crossingApp.userInput.gender = crossingApp.selectGen.value;
        crossingApp.userInput.species = crossingApp.selectSpe.value;

        //Once done, calls filter to filter userInput
        crossingApp.filterData(crossingApp.userInput, crossingApp.apiData);
    });
    
};

//3. Make an api call using user input

// const url = new URL('https://acnhapi.com/v1/villagers');

// url.search = new URLSearchParams({
    
// });
crossingApp.getData = function() {
    fetch('https://acnhapi.com/v1/villagers').then( (res) => {
        return res.json();
    })
    .then( (jsonRes) => {
        crossingApp.apiData = jsonRes;
        crossingApp.getUserInfo();
    });
}

//4. Filter our data using user input, create a new array of possible choices

crossingApp.filterData = function (userInput, jsonRes) {
    for (let villager in jsonRes) {
        //check personality
        const conditionOne = userInput.personality === jsonRes[villager].personality;
        
        //check gender
        const conditionTwo = userInput.gender === jsonRes[villager].gender;
        
                // console.log(userInput.gender);
                // console.log(jsonRes[villager].gender);
                // console.log(conditionTwo)
        
        //check species
        const conditionThree = userInput.species === jsonRes[villager].species;

        // console.log(conditionOne, conditionTwo, conditionOne && conditionTwo);

        if (conditionOne && conditionTwo && conditionThree) {
            crossingApp.possibleVillagers.push(jsonRes[villager]);
        }
    }
};

//5. randomly choose an activity from possible choices/ filtered options

//6. display the data by appending it to our html document



crossingApp.init();

//stretch goals

//add a reset button to randomly reselect a new activity with the same user input

//add from gif from giphy using the activity name

//visually increasing the tablet size of phone at end and having villager info inside