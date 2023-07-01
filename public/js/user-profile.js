
const quoteElement = document.getElementById("motivation");

var category = 'inspirational'
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
    headers: { 'X-Api-Key': 'WDZkDxoZTrzW5rJ+jJr2ZQ==YWOAV5C0qrUMSaXf'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
        const quote = result[0].quote;
    const author = result[0].author;
    quoteElement.innerHTML = '<p>"' + quote + '"</p><p>- ' + author + '</p>';
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});

window.addEventListener("DOMContentLoaded", () => {
  fetch("/user-profile")
    .then((response) => response.json())
    .then((data) => {
      const checkins = data.checkins;
      const checkinContainer = document.getElementById("checkin-container");
      const moodEmojis = {
        1: "😭",
        2: "😢",
        3: "😕",
        4: "😐",
        5: "🙂",
        6: "😃",
        7: "😍",
      };
      const motivationalSentences = {
        1: "Last week was tough, but today is a new day. Keep pushing forward!",
        2: "You faced challenges last week, but remember that you're stronger than you think.",
        3: "Despite the difficulties of last week, you're resilient. Keep going!",
        4: "You've shown incredible determination in the face of adversity. Keep that spirit alive!",
        5: "Last week was a mixed bag of emotions, but remember that every setback is an opportunity for growth.",
        6: "You had a great week! Whatever you're doing, keep going and maintain that positive momentum.",
        7: "Your positive attitude last week has brought you success. Keep up the fantastic work!"
      };
      let sum = 0;
      const emojisContainer = document.createElement("div"); // Create a container for emojis
      checkins.forEach((checkin) => {
        sum += checkin.mood;
        const moodElement = document.createElement("span"); // Use <span> instead of <p> for horizontal display
        const mood = checkin.mood;
        moodElement.textContent = moodEmojis[mood];
        moodElement.classList.add("emoji"); // Add a CSS class for styling
        emojisContainer.appendChild(moodElement); // Append each emoji to the container
      });
      checkinContainer.appendChild(emojisContainer); // Append the container to the checkinContainer
      const average = sum / checkins.length;
      const averageElement = document.createElement("p");
      averageElement.textContent = `${motivationalSentences[Math.round(average)]}`;
      checkinContainer.appendChild(averageElement);
    })
    .catch((error) => {
      console.log("Error fetching check-ins:", error);
    });
});



window.addEventListener("DOMContentLoaded", () => {
  fetch("/pushups/last-7-days")
    .then((response) => response.json())
    .then((data) => {
      const pushups = data.pushups;

      // Use the push-ups data in your JavaScript code
      pushups.forEach((pushup) => {
        // Access push-up properties
        const date = pushup.date;
        const count = pushup.count;

        // Perform actions with the push-up data
        console.log(`Push-ups on ${date}: ${count}`);
        // You can add more logic here based on your requirements
      });
    })
    .catch((error) => {
      console.log("Error fetching push-ups:", error);
    });
});




     /* if (pushupsToday) {
        const image = document.createElement("img");
        image.src = "./images/foot.jpg";
        image.alt = "Push-up Image";

        pushupsContainer.appendChild(image);
      }
      */
   

 
///day of week

 
window.addEventListener("DOMContentLoaded", () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay(); // Get the current day (0-6)

  const dayDivs = document.querySelectorAll('.day'); // Select all elements with class 'day'

  dayDivs.forEach((div, index) => {
    const dayIndex = (today - 6 + index + 7) % 7; // Calculate the index of the day in daysOfWeek array

    const dayElement = document.createElement("span");
    dayElement.textContent = daysOfWeek[dayIndex];

    div.appendChild(dayElement);
  });
});