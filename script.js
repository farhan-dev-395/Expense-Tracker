let expenses = [];
let currentFilter = "All";

window.onload = function () {
  let data = localStorage.getItem("expenses");
   if (data) {
    expenses = JSON.parse(data);
  }
  filterCategory(currentFilter);
  updateSummary();
};

function saveData() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
  let title = document.getElementById("title").value.trim();
  let amount = Number(document.getElementById("amount").value);
  let category = document.getElementById("category").value;

  if (title === "" || amount <= 0) {
    alert("Enter valid data");
    return;
  }

  let expense = {
    id: Date.now(),
    title,
    amount,
    category
  };

  expenses.push(expense);
  saveData();

  filterCategory(currentFilter);
  updateSummary();

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "Food";
}

function displayExpenses(arr) {
  let list = document.getElementById("list");
  list.innerHTML = "";

  arr.forEach(exp => {
    let li = document.createElement("li");

    let text = document.createElement("span");
    text.textContent = `${exp.title} - Rs ${exp.amount} (${exp.category})`;

    let btn = document.createElement("button");
    btn.textContent = "X";
    btn.className = "delete";
    btn.onclick = function () { 
      deleteExpense(exp.id);
    };

    li.appendChild(text);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveData();

  filterCategory(currentFilter);
  updateSummary();
}

function filterCategory(cat) {
  currentFilter = cat;

  if (cat === "All") {
    displayExpenses(expenses);
  } else {
    let filtered = expenses.filter(exp => exp.category === cat);
    displayExpenses(filtered);
  }
}

function updateSummary() {
  let total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  document.getElementById("summary").innerText = "Monthly Total: Rs " + total;
}
