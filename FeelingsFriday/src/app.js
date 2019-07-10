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
    console.log(feelings);
    const card = document.getElementById("user-card");
    let name = document.createElement("h2");
    let mood = document.createElement("h3");
    let passBtn = document.createElement("button");
    passBtn.textContent = "Pass";
    name.textContent = user.name;
    mood.textContent = `Current Mood: ${user.currentMood}`;

    let feelingDiv = document.createElement("div");

    card.appendChild(name);
    card.appendChild(mood);
    card.appendChild(passBtn);
    list.appendChild(card);

    for(let i=0; i < feelings.length; i++){

        let feelingContent = document.createElement("p");
        let likes = document.createElement("p");
        let likeButton = document.createElement("button");
        //changed like-btn to like-btn-$feelings[i].id
        //becuse id is unique
        likeButton.setAttribute("id", `like-btn-${feelings[i].id}`)
        likeButton.textContent = "Likes"

        feelingContent.textContent = feelings[i].content;
        likes.textContent = `${feelings[i].likes} `

        likeButton.addEventListener('click', ()=>{
          likeFeels(feelings[i], likes, user)
        })
        likes.appendChild(likeButton)
        feelingContent.appendChild(likes);
        feelingDiv.appendChild(feelingContent);

        card.appendChild(feelingDiv);
    }
}

function likeFeels(feeling, likeDisplay, user){
  let likebtn = document.getElementById(`like-btn-${feeling.id}`)
  feeling.likes++
  likeDisplay.textContent = feeling.likes
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

form.addEventListener("submit", () => {
    newUser();
    form.reset();
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
    .then(json => console.log(json))

}

fetchUsers();