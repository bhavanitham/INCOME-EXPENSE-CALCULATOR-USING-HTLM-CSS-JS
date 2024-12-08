let entries = JSON.parse(localStorage.getItem('entries')) || [];

function renderEntries(filteredEntries = entries) {
    const list = document.getElementById('entriesList');
    list.innerHTML = '';
    filteredEntries.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${entry.description} - ${entry.amount} (${entry.type})</span>
            <button onclick="deleteEntry(${index})">Delete</button>
        `;
        list.appendChild(li);
    });

    updateSummary();
}

function updateSummary() {
    const totalIncome = entries.filter(entry => entry.type === 'income').reduce((acc, entry) => acc + parseFloat(entry.amount), 0);
    const totalExpense = entries.filter(entry => entry.type === 'expense').reduce((acc, entry) => acc + parseFloat(entry.amount), 0);
    const netBalance = totalIncome - totalExpense;

    document.getElementById('totalIncome').textContent = totalIncome;
    document.getElementById('totalExpense').textContent = totalExpense;
    document.getElementById('netBalance').textContent = netBalance;
}

function addEntry() {
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;

    if (description && amount) {
        const newEntry = { description, amount, type };
        entries.push(newEntry);
        localStorage.setItem('entries', JSON.stringify(entries));
        renderEntries();
        resetFields();
    } else {
        alert('Please fill in both description and amount.');
    }
}

function deleteEntry(index) {
    entries.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
    renderEntries();
}

function resetFields() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}

function filterEntries(filter) {
    if (filter === 'all') {
        renderEntries();
    } else {
        const filteredEntries = entries.filter(entry => entry.type === filter);
        renderEntries(filteredEntries);
    }
}

window.onload = renderEntries;  // Load entries when the page loads
