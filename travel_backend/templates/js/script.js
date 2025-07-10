document.querySelector('.login-btn').addEventListener('click', () => {
  alert('Login clicked');
});

document.querySelector('.signup-btn').addEventListener('click', () => {
  alert('Signup clicked');
});


const tabs = document.querySelectorAll(".nta-tab");
const panes = document.querySelectorAll(".nta-tab-pane");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Remove active from all
    tabs.forEach(t => t.classList.remove("active"));
    panes.forEach(p => p.classList.remove("active"));

    // Activate clicked
    tab.classList.add("active");
    const activePane = document.getElementById(tab.dataset.tab);
    activePane.classList.add("active");
  });
});


fetch('http://127.0.0.1:8000/api/destinations/')
  .then(response => response.json())
  .then(data => {
    console.log(data); // do something with API data
  })
  .catch(error => console.error('Error:', error));