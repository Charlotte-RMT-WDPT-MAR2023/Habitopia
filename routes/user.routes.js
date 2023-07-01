const { isLoggedIn, isLoggedOut } =require("../middleware/route-guard.js");

const router = require("express").Router();

const { pushUps, water, yoga } = require("../models/HabitsTracker.model.js");


router.get("/habits",isLoggedIn,(req, res) => res.render("users/tracker/habits"));
router.get("/addhabit",isLoggedIn, (req, res) => res.render("users/tracker/add-habit"));
router.get("/pushups", isLoggedIn, (req, res) => res.render("users/tracker/pushup"));
router.get("/yoga", isLoggedIn, (req, res) => res.render("users/tracker/yoga"));
router.get("/water", isLoggedIn, (req, res) => res.render("users/tracker/water"));

 
// Habits Tracker Page GET routes
router.get("/pushups", isLoggedIn, (req, res) => {

  res.render("users/tracker/pushup");
});

router.get("/yoga", isLoggedIn,(req, res) => {
  res.render("users/tracker/yoga");
})

router.get("/water", isLoggedIn,(req, res) => {
  res.render("users/tracker/water")
})


//POST routes for each habit

router.post("/pushups", isLoggedIn, (req, res) => {
  const { numberOf } = req.body;

  const newPushUps = new pushUps({
    numberOf,
    date: new Date() // Set the date to the current date
  });

  newPushUps
    .save()
    .then(() => {
      res.redirect("/entriespushups");
    })
    .catch((error) => {
      console.log("Error saving data:", error);
      res.redirect("/error");
    });
});


router.post("/water", isLoggedIn, (req, res) => {
  const { liters } = req.body;

  const newLiters = new water ({ 
    liters,
    date: new Date()
  });

  newLiters
    .save()
    .then(() => {
      res.redirect("/entrieswater"); 
    })
    .catch((error) => {
      console.log("Error saving data:", error);
      res.redirect("/error"); 
    });
});


router.post("/yoga", isLoggedIn, (req, res) => {
  const { minutes } = req.body;

  const newMinutes = new yoga({ minutes });

  newMinutes
    .save()
    .then(() => {
      res.redirect("/entriesyoga");
    })
    .catch((error) => {
      res.redirect("/error");
    });
});



//Entries route for each habit

router.get("/entriespushups", isLoggedIn, async (req, res) => {
  try {
    const entriesPushUps = await pushUps.find().sort({ date: "desc" });

    // Create an object to store entries grouped by date
    const entriesByDate = {};

    entriesPushUps.forEach(entry => {
      const date = entry.date.toLocaleDateString("en-GB"); // Format: dd-mm-yyyy
      
      if (!entriesByDate[date]) {
        entriesByDate[date] = [];
      }

      entriesByDate[date].push({ content: entry.numberOf });  //property to be displayed 
    });

    res.render("users/tracker/pushUpEntries", { entriesByDate });
      
  } catch (error) {
    return res.status(500).send("An error occurred while retrieving previous entries.");
  }
});


//Water entries route 

router.get("/entrieswater", isLoggedIn, async (req, res) => {
  try {
    const entriesWater = await water.find().sort({ date: "desc" });

    const entriesByDate = {};

    entriesWater.forEach(entry => {
      if (entry.date) {
        const date = entry.date.toLocaleDateString("en-GB"); 

        if (!entriesByDate[date]) { 
          entriesByDate[date] = [];
        }
    
        entriesByDate[date].push({ content: entry.liters });   
      }
    });

    res.render("users/tracker/waterEntries", { entriesByDate });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("An error occurred while retrieving previous entries.");
  }
});


//Yoga entries route
router.get("/entriesyoga", isLoggedIn, async (req, res) => {
  try {
    const entriesYoga = await yoga.find().sort({ date: "desc" });

    const entriesByDate = {};

    entriesYoga.forEach(entry => {
      if(entry.date) {
        const date = entry.date.toLocaleDateString("en-GB");

        if (!entriesByDate[date]) { entriesByDate[date] = [] }

        entriesByDate[date].push({ content: entry.minutes });
      }
    });
    res.render("users/tracker/yogaEntries", { entriesByDate });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("An error occurred while retrieving previous entries.");
  }
});



// Route for displaying entries for a specific habit
router.get("/entries/:habit", isLoggedIn, async (req, res) => {
  try {
    const habit = req.params.habit;

    let entriesByDate = [];

    switch (habit) {
      case "pushups":
        entriesByDate = await pushUps.find().sort({ date: "desc" });
        res.render("users/tracker/pushUpEntries", { entriesByDate, content: "numberOf" });
        break;
      case "water":
        entriesByDate = await water.find().sort({ date: "desc" });
        res.render("users/tracker/waterEntries", { entriesByDate, content: "liters" });
        break;
      case "yoga":
        entriesByDate = await yoga.find().sort({ date: "desc" });
        res.render("users/tracker/yogaEntries", { entriesByDate, content: "minutes" });
        break;
      default:
        return res.status(404).send("Insert coin :P");
    }

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("An error occurred while retrieving previous entries: " + error.message);
  }
  
});      



module.exports = router