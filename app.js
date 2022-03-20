const goalForm = document.getElementById("goal-form");
const goal = document.getElementById("goal");
const due = document.getElementById("due");
const goalsDiv = document.querySelector(".goals-div");
let goalArray = [];
let cardsArray;

const localStorageData = JSON.parse(localStorage.getItem("allGoals"));

if (localStorageData) {
  goalArray = [...localStorageData];
  getGoals();
}

function Goal(goalName, dueDate) {
  this.goalName = goalName;
  this.dueDate = dueDate;
}

goalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newGoal = new Goal();
  newGoal.goalName = goal.value;
  newGoal.dueDate = due.value;
  goalArray.push(newGoal);
  console.log(goalArray);
  localStorage.setItem("allGoals", JSON.stringify(goalArray));
  goalForm.reset();
  getGoals();
});

function getGoals() {
  goalsDiv.innerHTML = "";
  goalArray.forEach((goal, index) => {
    const goalCard = document.createElement("div");
    goalsDiv.appendChild(goalCard);
    goalCard.innerHTML = `
        <h4>${goal.goalName}</h4>
        <p>Due: ${goal.dueDate}</p>
    `;
    goalCard.classList.add("goal-card");

    const completed = document.createElement("p");
    completed.textContent = "Pending ..💪🏾";
    goalCard.appendChild(completed);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    goalCard.appendChild(checkbox);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        completed.textContent = "Completed 🎉";
        goalCard.classList.add("completed");
      } else {
        completed.textContent = "Pending ..💪🏾";
        goalCard.classList.remove("completed");
      }
    });

    cardsArray = Array.from(document.querySelectorAll(".goal-card"));

    const today = new Date();
    const dueDate = new Date(goal.dueDate);
    
    if (
      today.getDay() === dueDate.getDay() &&
      today.getMonth() === dueDate.getMonth() &&
      today.getYear() === dueDate.getYear()
    ) {
      cardsArray[index].classList.add("due");
      cardsArray[index].style.color = "red";
      completed.textContent = "Date due ..👴🏾👵🏾";
    }

    goalCard.addEventListener("dblclick", () => {
      let deletedIndex = goalArray.indexOf(goal);
      console.log(deletedIndex);
      goalArray.splice(deletedIndex, 1);
      cardsArray.splice(deletedIndex, 1);
      console.log(goalArray);
      localStorage.setItem("allGoals", JSON.stringify(goalArray));
      getGoals();
      return goalArray;
    });

  });
}

// localStorage.clear();

// let sum = 0;
// for(let i = 1; i < 5; i++) {
//   let square = i**2
//   sum += square
// }

// console.log(sum)

// function sort(x,y,z) {
//   let arr = [x,y,z]
//   arr = arr.sort()
//   return arr.join(",")
// }

// console.log(sort(7,6,9))
