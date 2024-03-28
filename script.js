document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalExpenses = document.getElementById('total-expenses');
    const currentDate = document.getElementById('current-date');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function displayExpenses() {
        expenseList.innerHTML = '';
        let total = 0;

        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${expense.name}: $${expense.amount} - ${expense.date} <button class="delete" data-index="${index}"><i class="ri-delete-bin-2-fill"></i></button>`;
            expenseList.appendChild(li);
            total += expense.amount;
        });

        totalExpenses.textContent = total.toFixed(2);
    }

    function addExpense(name, amount, date) {
        expenses.push({ name, amount, date });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();
    }

    function deleteExpense(index) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();
    }

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const expenseName = document.getElementById('expense').value.trim();
        const expenseAmount = parseFloat(document.getElementById('amount').value.trim());
        const expenseDate = document.getElementById('date').value;

        if (expenseName && !isNaN(expenseAmount) && expenseDate) {
            addExpense(expenseName, expenseAmount, expenseDate);
            expenseForm.reset();
        } else {
            alert('Please enter valid expense details.');
        }
    });

    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('ri-delete-bin-2-fill')) {
            const index = e.target.closest('.delete').dataset.index;
            deleteExpense(index);
        }
    });

    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    currentDate.textContent = dateStr;

    displayExpenses();
});
