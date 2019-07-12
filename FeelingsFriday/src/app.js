"use strict";
const usersURL = "http://localhost:3000/users";
const feelingsURL = "http://localhost:3000/feelings";

const list = document.getElementById("user-list");

const form = document.getElementById("new-form");

function fetchUsers(){
    fetch(usersURL)
    .then(resp => resp.json())
    .then(json => displayUsers(json))
}

function displayUsers(users){
    users.forEach(user => {
        showOneUser(user);
    })
}

function showOneUser(user){
    let hr = document.createElement("hr");
    hr.setAttribute("class", "hr-line");

    // const card = document.getElementById("user-card");
    const card = document.createElement('div');
    card.setAttribute("class", "card");

    let name = document.createElement("h2");
    name.setAttribute("class", "name");

    let mood = document.createElement("h3");
    mood.setAttribute("class", "mood");

    let passBtn = document.createElement("button");
    passBtn.textContent = "Pass";
    passBtn.setAttribute("class", "pass-btn");

    name.textContent = user.name;
    mood.textContent = `Mood of the Day: ${user.currentMood}`;

    hr.appendChild(name);
    card.appendChild(hr);
    card.appendChild(mood);
    card.appendChild(passBtn);
  
    list.appendChild(card);
    //console.log(user, card);
    getFeels(user, card);
}

function getFeels(user, div) {
    fetch(`http://localhost:3000/user_feelings/${user.id}`)
    .then(res => res.json())
    .then(json => showFeels(json, div))
}

function showFeels(myFeels, div){
    //console.log(user, myFeels);
    let feelingDiv = document.createElement("div");
    feelingDiv.setAttribute("class", "feeling-div");

    let card = document.createElement("li");
    card.setAttribute("class", "card");

       for(let i=0; i < myFeels.length; i++){

        let feelingContent = document.createElement("p");
        feelingContent.setAttribute("class", "feelingContent");

        let likes = document.createElement("p");
        likes.setAttribute("class", "likes");

        let likeButton = document.createElement("button");
        likeButton.setAttribute("class", "like-button");

        let commentsDiv = document.createElement("div");
        commentsDiv.setAttribute("class", "comments-div");

        //changed like-btn to like-btn-$myFeels[i].id
        //becuse id is unique
        likeButton.setAttribute("id", `like-btn-${myFeels[i].id}`)
        likeButton.textContent = "CLAP";

        let clapDiv = document.createElement("div");
        clapDiv.setAttribute("class", "clapping")

        //likeButton.textContent = String.fromCodePoint("U+1F44F");
        //
        feelingContent.textContent = myFeels[i].content;
        likes.textContent = `CLAPS: ${myFeels[i].likes} `

        //Clicking the CLAP Button
        likeButton.addEventListener('click', ()=>{
          likeFeels(myFeels[i], likes)
        })
        
        likes.appendChild(likeButton)
        feelingDiv.appendChild(likes);
        feelingDiv.appendChild(feelingContent);
        card.appendChild(feelingDiv);
        div.appendChild(card);
    }
}

function commenting(){

}

function likeFeels(feeling, likeDisplay){
  let likebtn = document.getElementById(`like-btn-${feeling.id}`)
  feeling.likes++
  likeDisplay.textContent = `CLAPS: ${feeling.likes}`
  likeDisplay.appendChild(likebtn)
  fetch(feelingsURL + "/" + feeling.id,{
   method: "PATCH",
   headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json'
   },
   body:
     JSON.stringify({
       likes: feeling.likes
     })
   })
  .then(res=>res.json())
  .then(json=> console.log(json))
}

//NEW FEELING FORM
form.addEventListener("submit", () => {
    event.preventDefault();
    let nameError = document.getElementById("name-error");
    nameError.setAttribute("class", "errorMessage hidden");
    nameError.textContent = "Please enter a name";

    let feelingError = document.getElementById("feeling-error");
    feelingError.setAttribute("class", "errorMessage hidden");
    feelingError.textContent = "No fewer than 3 characters";

    let nameAndFeelingError = document.getElementById("name-feeling-error");
    nameAndFeelingError.setAttribute("class", "errorMessage hidden");
    nameAndFeelingError.textContent = "No Name, No Feeling";

    if(form.name.value == "" && form.feels.value.length == 0){//No Name, No Feelings //IS WORKING
        nameAndFeelingError.classList.remove("hidden");
        console.log("No Name, No Feeling");
    }
    else if(form.name.value == "" && (form.feels.value.length >= 1 && form.feels.value.length < 3)  ){//Name is Error and Feelings is not enough characters Error //IS WORKING
        nameError.classList.remove("hidden");
        feelingError.classList.remove("hidden");
    }
    else if(form.name.value == "" && form.feels.value.length > 3 ){//Name is the Error //IS WORKING
        nameError.classList.remove("hidden");
    }
    else if(form.name.value && form.feels.value.length < 3){//Feelings is the Error //IS WORKING
        feelingError.classList.remove("hidden");
        console.log("Feelings content is less than 3 characters");
    }
    else if(form.name.value && form.feels.value.length > 3){
        console.log("valid input");
        newUser();
        form.reset();
    } 
})

function newUser(){
    event.preventDefault();
    //if new user = create card with name, mood, and feeling
    //if name input matches = change mood to new mood (if it is different), and add new feeling

    let feels = form.feels.value
    console.log("feelings input: ", form.feels.value)
    fetch(usersURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: form.name.value,
            currentMood: form.mood.value
        })
    })
    .then(resp => resp.json())
    .then(json => {
        
        newFeeling(json, feels)
        console.log(json, feels)
    })
}

function newFeelingInstead(){

}

function newFeeling(newUser, feels){
    console.log(newUser, feels);
    fetch(feelingsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            user_id: newUser.id,
            content: feels,
            likes: 0
        })
    })
    .then(showOneUser(newUser))
    // .then(json => showOneUser(newUser))

}

fetchUsers();