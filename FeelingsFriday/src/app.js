'using strict'

const usersURL = "http://localhost:3000/users";

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
    const card = document.getElementById("user-card");
    let name = document.createElement("h2");
    let mood = document.createElement("h3");
    name.textContent = user.name;
    mood.textContent = `Current Mood: ${user.currentMood}`;

    card.appendChild(name);
    card.appendChild(mood);
    list.appendChild(card);

    console.log(user);
}

form.addEventListener("submit", () => {
    newUser();
    form.reset();
})

function newUser(){
    event.preventDefault();
    //form.name.value
    //form.mood.value
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
    .then(json => console.log(json))
}

fetchUsers();