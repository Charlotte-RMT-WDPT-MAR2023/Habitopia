const today = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('new-entry-date').textContent = today.toLocaleDateString('en-US', options);
