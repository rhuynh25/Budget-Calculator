// Budget class for income, expenses, and budget
class Budget {
  constructor() {
    this.income = [];
    this.expenses = [];
  }

  // Method to add an income item
  addIncome(description, amount) {
    const incomeItem = { description, amount };
    this.income.push(incomeItem);
    this.addToHistory('income', incomeItem);
  }

  // Method to add an expense item
  addExpense(description, amount) {
    const expenseItem = { description, amount };
    this.expenses.push(expenseItem);
    this.addToHistory('expense', expenseItem); 
  }

  // Method to calculate total income
  calculateTotalIncome() {
    return this.income.reduce((total, inc) => total + inc.amount, 0);
  }

  // Method to calculate total expenses
  calculateTotalExpenses() {
    return this.expenses.reduce((total, exp) => total + exp.amount, 0);
  }

  // Method to calculate total budget
  calculateTotalBudget() {
    return this.calculateTotalIncome() - this.calculateTotalExpenses();
  }

  // Method to add a transaction item to the history
  addToHistory(type, item) {
    const historyList = document.getElementById('transaction-history');
    const listItem = document.createElement('li');
    listItem.classList.add(type); // Added a class 'income' or 'expense' to item list
    listItem.innerText = `${type === 'income' ? '+' : '-'} $${item.amount.toFixed(2)} - ${item.description}`;
    historyList.appendChild(listItem);
  }
}

const budget = new Budget();

// Function to update the summary
function updateSummary() {
  document.getElementById('totalIncome').textContent = budget.calculateTotalIncome().toFixed(2);
  document.getElementById('totalExpenses').textContent = budget.calculateTotalExpenses().toFixed(2);
  document.getElementById('totalBudget').textContent = budget.calculateTotalBudget().toFixed(2);
}

// Function to clear the input fields after adding transaction
function clearInputs() {
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
}

// Event listener for adding incomes
document.getElementById('addIncome').addEventListener('click', function() {
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);

  if (description && !isNaN(amount) && amount > 0) {
    budget.addIncome(description, amount); 
    updateSummary(); 
    clearInputs();
  } else {
    alert('Please enter valid description and income amount');
  }
});

// Event listener for adding expenses
document.getElementById('addExpense').addEventListener('click', function() {
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);

  // Validate the input fields
  if (description && !isNaN(amount) && amount > 0) {
    budget.addExpense(description, amount); 
    updateSummary();
    clearInputs(); 
  } else {
    alert('Please enter valid description and expense amount');
  }
});
