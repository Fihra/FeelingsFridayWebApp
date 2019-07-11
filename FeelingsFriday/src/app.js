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
        getFeels(user);
    })
}

function getFeels(user) {
    fetch(`http://localhost:3000/user_feelings/${user.id}`)
    .then(res => res.json())
    .then(json => showOneUser(user, json))
}

function fetchAllOfTheFeels(){
    fetch(feelingsURL)
    .then(resp => resp.json())
    .then(json => console.log(json))
}

function showOneUser(user, feelings){
    let hr = document.createElement("hr");
    hr.setAttribute("class", "hr-line");

    const card = document.getElementById("user-card");
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

    let feelingDiv = document.createElement("div");
    feelingDiv.setAttribute("class", "feeling-div");
    hr.appendChild(name);
    card.appendChild(hr);
    card.appendChild(mood);
    card.appendChild(passBtn);
  
    list.appendChild(card);

    for(let i=0; i < feelings.length; i++){

        let feelingContent = document.createElement("p");
        feelingContent.setAttribute("class", "feelingContent");

        let likes = document.createElement("p");
        likes.setAttribute("class", "likes");

        let likeButton = document.createElement("button");
        likeButton.setAttribute("class", "like-button");

        let commentsDiv = document.createElement("div");
        commentsDiv.setAttribute("class", "comments-div");

        //changed like-btn to like-btn-$feelings[i].id
        //becuse id is unique
        likeButton.setAttribute("id", `like-btn-${feelings[i].id}`)
        likeButton.textContent = "CLAP";

        feelingContent.textContent = feelings[i].content;
        likes.textContent = `CLAPS: ${feelings[i].likes} `

        //Clicking the CLAP Button
        likeButton.addEventListener('click', ()=>{
          likeFeels(feelings[i], likes, user)
        })
        likes.appendChild(likeButton)
        feelingContent.appendChild(likes);
        feelingDiv.appendChild(feelingContent);
        card.appendChild(feelingDiv);
    }

}

function commenting(){

}

function likeFeels(feeling, likeDisplay, user){
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

// document.getElementById('pop_up').innerHTML="Enter your name";
//         document.getElementById('uname').focus();

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
    .then(json => newFeeling(json, feels))
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
    .then(resp => resp.json())
    .then(json => (json))

}

fetchUsers();