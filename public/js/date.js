const today = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('new-entry-date').textContent = today.toLocaleDateString('en-US', options);



/*
hbs.registerHelper('formatDate', function (date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
});
*/
