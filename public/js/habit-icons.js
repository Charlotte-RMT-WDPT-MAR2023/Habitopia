window.addEventListener("DOMContentLoaded", () => {
  fetch('/7days/pushups')
  .then(response => response.json())
  .then(data => {
    const pushUpsArray = data;
    console.log(pushUpsArray);
    const today = new Date();
    const pushupContainer = document.getElementsByClassName("pushups")[0];
    
    for (let i = 6; i >= 0; i--) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      const formattedDate = currentDate.toISOString().split('T')[0];
      const liElement = document.getElementById(`pushup-today-${i}`);
      
      const hasEntry = pushUpsArray.some((entry) => {
        const entryDate = new Date(entry.date);
        const formattedEntryDate = entryDate.toISOString().split('T')[0];
        return formattedEntryDate === formattedDate;
      });
      
      if (hasEntry) {
        const image = document.createElement("img");
        image.src = "/images/Arm.png"; 
        image.classList.add("thumbnail");
        liElement.appendChild(image);
      }
    }
  })
  .catch(error => {
    console.log("Error while fetching push-ups data: ", error);
  });
});


window.addEventListener("DOMContentLoaded", () => {
  fetch('/7days/water')
  .then(response => response.json())
  .then(data => {
    const waterArray = data;
    console.log(waterArray);
    const today = new Date();
    const waterContainer = document.getElementsByClassName("waters")[0];
    
    for (let i = 6; i >= 0; i--) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      const formattedDate = currentDate.toISOString().split('T')[0];
      const liElement = document.getElementById(`water-today-${i}`);
      
      const hasEntry = waterArray.some((entry) => {
        const entryDate = new Date(entry.date);
        const formattedEntryDate = entryDate.toISOString().split('T')[0];
        return formattedEntryDate === formattedDate;
      });
      
      if (hasEntry) {
        const image = document.createElement("img");
        image.src = "/images/waterGlass.png"; 
        image.classList.add("thumbnail");
        liElement.appendChild(image);
      }
    }
  })
  .catch(error => {
    console.log("Error while fetching water data: ", error);
  });
});


window.addEventListener("DOMContentLoaded", () => {
  fetch('/7days/yoga')
  .then(response => response.json())
  .then(data => {
    const yogaArray = data;
    console.log(yogaArray);
    const today = new Date();
    const yogaContainer = document.getElementsByClassName("yogas")[0];
    
    for (let i = 6; i >= 0; i--) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      const formattedDate = currentDate.toISOString().split('T')[0];
      const liElement = document.getElementById(`yoga-today-${i}`);
      
      const hasEntry = yogaArray.some((entry) => {
        const entryDate = new Date(entry.date);
        const formattedEntryDate = entryDate.toISOString().split('T')[0];
        return formattedEntryDate === formattedDate;
      });
      
      if (hasEntry) {
        const image = document.createElement("img");
        image.src = "/images/wellbeing.png"; 
        image.classList.add("thumbnail");
        liElement.appendChild(image);
      }
    }
  })
  .catch(error => {
    console.log("Error while fetching yoga data: ", error);
  });
});