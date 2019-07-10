'using strict'

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

function showOneUser(user, feelings){
    //console.log(feelings);
    const card = document.getElementById("user-card");
    let name = document.createElement("h2");
    let mood = document.createElement("h3");
    let likeButton = document.createElement("button");
    let likes = document.createElement("p");
    name.textContent = user.name;
    mood.textContent = `Current Mood: ${user.currentMood}`;

    likes.textContent = feelings.likes;
    likeButton.textContent = `Like: ${feelings.likes}`;
    likeButton.appendChild(likes);

    card.appendChild(name);
    card.appendChild(mood);
    card.appendChild(likeButton);
    list.appendChild(card);
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
//newFeeling(json, form.feels.value)

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