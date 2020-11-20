const playerName = document.querySelector(".player h2")
const playerImg = document.querySelector(".player img")
const playerNickname = document.querySelector(".player em")
const playerLikes = document.querySelector(".player p")
const likeBtn = document.querySelector(".like-button")
const goals = document.querySelector("#goals")
const newGoalForm = document.querySelector("#new-form-goal")



function data() {
    return fetch("http://localhost:3000/players/1")
    .then(response => response.json())
    .then(playerObj => renderPlayer(playerObj))
}
data()

function renderPlayer(player) {
    playerImg.src = player.photo
    playerImg.alt = player.name
    playerName.textContent = player.name
    playerNickname.textContent = player.playerNickname
    playerImg.parentElement.dataset.id = player.id
    playerLikes.textContent = "${player.likes} Likes"

    renderGoal(player.goal)
}

function renderGoal(goals) {
    goals.forEach(goal => {
        updatedGoal(goal)
    })
} 

function updatedGoal(goal) {
    const li = document.createElement("li")
    const pGoal = document.createElement("p")
    const aGoal = document.createElement("a")

    li.dataset.id = goal.id
    li.dataset.playerid = goal.playerId
    pGoal.textContent = goal.description
    aGoal.href = goal.link
    aGoal.textContent = goal.link

    li.append(pGoal, aGoal)
    goals.append(li)
}



likeBtn.addEventListener("click", addLikes)

function addLikes() {
    fetch("http://localhost:3000/players/1", {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            likes: '${parseInt(playerLikes.textContent) + 1}'
        })
    })
    .then(response => response.json())
    .then(currentLikes => {
        playerLikes.textContent = "${currentLikes.likes} Likes"
    })
}

newGoalForm.addEventListener("submit", newGoal)

function newGoal(event) {
    event.preventDefault()
    const goalObj = {
        playerId: parseInt(event.target.previousElementSibling.id),
        link: event.target['goal-link'].value,
        description: event.target['goal-description'].value
    }
    fetch("http://localhost:3000/goals", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(goalObj)
    })
    .then(response => response.json())
    .then(goalUpdate => {
        renderGoal(goalUpdate)
    })
}