//Pseudocode!!!
//What is our mvp?
//using the acnh api, we want to suggest an activity for the user to do.
//we want the user to pick from a set amount of questions in order to narrow down our choices of activity to a subset of activities. One activity will be randomly selected from this subset, and displayed to the user. If the user wants another activity in the same subset, they can click a button to randomly select a new activity.

//1. on initial page load, create namespace object display our questions and prompt the user for a response.

const crossingApp = {};

//query selectors
crossingApp.formEl = document.querySelector('#inputForm');
crossingApp.selectPer = document.querySelector('#personality');
crossingApp.selectRange = document.querySelector('#speciesRange');
crossingApp.selectSpe1 = document.querySelector('#speciesOne');
crossingApp.selectSpe2 = document.querySelector('#speciesTwo');
crossingApp.selectSpe3 = document.querySelector('#speciesThree');
crossingApp.selectSpe4 = document.querySelector('#speciesFour');
crossingApp.divSpe1 = document.querySelector('.speciesOne');
crossingApp.divSpe2 = document.querySelector('.speciesTwo');
crossingApp.divSpe3 = document.querySelector('.speciesThree');
crossingApp.divSpe4 = document.querySelector('.speciesFour');
crossingApp.villagerEl = document.querySelector('.villagerContainer');
crossingApp.formContainer = document.querySelector('.formContainer')

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

crossingApp.selectRange.addEventListener('change', () => {
    if (crossingApp.selectRange.value === 'first') {
        crossingApp.divSpe1.classList.remove('hidden');
        crossingApp.divSpe2.classList.add('hidden');
        crossingApp.divSpe3.classList.add('hidden');
        crossingApp.divSpe4.classList.add('hidden');
    }
    if (crossingApp.selectRange.value === 'second') {
        crossingApp.divSpe1.classList.add('hidden');
        crossingApp.divSpe2.classList.remove('hidden');
        crossingApp.divSpe3.classList.add('hidden');
        crossingApp.divSpe4.classList.add('hidden');
    }
    if (crossingApp.selectRange.value === 'third') {
        crossingApp.divSpe1.classList.add('hidden');
        crossingApp.divSpe2.classList.add('hidden');
        crossingApp.divSpe3.classList.remove('hidden');
        crossingApp.divSpe4.classList.add('hidden');
    }
    if (crossingApp.selectRange.value === 'fourth') {
        crossingApp.divSpe1.classList.add('hidden');
        crossingApp.divSpe2.classList.add('hidden');
        crossingApp.divSpe3.classList.add('hidden');
        crossingApp.divSpe4.classList.remove('hidden');
    }
});

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

        crossingApp.currentVillagerIndex = 0;

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
    //clear possibleVillagers array before filtering
    crossingApp.possibleVillagers = [];

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

    crossingApp.chooseVil(crossingApp.possibleVillagers);
};

//5. randomly choose an villager from possible choices/ filtered options
crossingApp.chooseVil = function(possibleVillagers) {
    if (possibleVillagers.length === 0) {
        crossingApp.displayData(null);
    } else {
        crossingApp.displayData(possibleVillagers[crossingApp.currentVillagerIndex]);
    }
}


//6. display the data by appending it to our html document

crossingApp.displayData = function(displayedVillager) {

    if (displayedVillager === null) {
        crossingApp.villagerEl.innerHTML = "";

        const noMatch = "There's no matching villager :( Try again!";
        const noMatchEl = document.createElement('p');
        noMatchEl.innerText = noMatch;
        
        crossingApp.villagerEl.appendChild(noMatchEl);


    } else {
        crossingApp.villagerEl.innerHTML = "";

        // console.log(crossingApp.possibleVillagers.length)
        const quantity = document.createElement('p');
        quantity.innerText = `Displaying ${crossingApp.currentVillagerIndex + 1} of ${crossingApp.possibleVillagers.length} results`;
        crossingApp.villagerEl.appendChild(quantity);

    
        const name = displayedVillager.name["name-USen"];
        
        const h2El = document.createElement('h2');
        h2El.innerText = name;
        crossingApp.villagerEl.appendChild(h2El);
    
    
        const image = document.createElement('img');
        image.src = displayedVillager.image_uri;
        image.alt = `Image of ${name}. They are a ${displayedVillager.species}`;
        crossingApp.villagerEl.appendChild(image);

        if (crossingApp.currentVillagerIndex !== 0) {
            const backButton = document.createElement('button');
            backButton.innerText = "Previous Villager";
            backButton.classList.add('backButton');
            crossingApp.villagerEl.appendChild(backButton);
        }
        
        if (crossingApp.currentVillagerIndex !== crossingApp.possibleVillagers.length - 1) {
            const nextButton = document.createElement('button');
            nextButton.innerText = "Next Villager";
            nextButton.classList.add('nextButton');
            crossingApp.villagerEl.appendChild(nextButton);
        }
        
        const resetButton = document.createElement('button');
        resetButton.innerText = "Choose again?";
        resetButton.classList.add('resetButton');
        crossingApp.villagerEl.appendChild(resetButton);

        crossingApp.formContainer.classList.add('hidden');
    }
}

crossingApp.resetPage = function() {
    crossingApp.formContainer.classList.remove('hidden');
    crossingApp.villagerEl.innerHTML = "";
    crossingApp.possibleVillagers = [];
};

//add event listener to buttons in villagerContainer
crossingApp.villagerEl.addEventListener('click', (event) => {
    if (event.target.className === 'nextButton') {
        crossingApp.currentVillagerIndex++;
        crossingApp.chooseVil(crossingApp.possibleVillagers);
    }
    
    if (event.target.className === 'backButton') {
        crossingApp.currentVillagerIndex--;
        crossingApp.chooseVil(crossingApp.possibleVillagers);
    }

    if (event.target.className === 'resetButton') {
        crossingApp.resetPage();
    }

});


crossingApp.init();

//stretch goals

//add a reset button to randomly reselect a new activity with the same user input

//add from gif from giphy using the activity name

//visually increasing the tablet size of phone at end and having villager info inside