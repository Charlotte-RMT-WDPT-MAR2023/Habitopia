const { model } = require("mongoose");
const { isLoggedIn, isLoggedOut } =require("../middleware/route-guard.js");

const router = require("express").Router();

const { pushUps, water, yoga } = require("../models/HabitsTracker.model.js");

router.get("/habits",isLoggedIn,(req, res) => res.render("users/tracker/habits"));
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
  const userId = req.session.currentUser._id;
  const { numberOf } = req.body;

  const newPushUps = new pushUps({
    numberOf,
    user: userId,
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
  const userId = req.session.currentUser._id;
  const { liters } = req.body;

  const newLiters = new water ({ 
    liters,
    user: userId,
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
  const userId = req.session.currentUser._id;
  const { minutes } = req.body;

  const newMinutes = new yoga({ 
    minutes,
    user: userId,
    date: new Date()
  });

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
    const userId = req.session.currentUser._id;

    const entriesPushUps = await pushUps.find({user: userId}).sort({ date: "desc" });


    // Create an object to store entries grouped by date
    const entriesByDate = {};

    entriesPushUps.forEach(entry => {
      const date = entry.date.toLocaleDateString("en-GB");

      if (!entriesByDate[date]) {
        entriesByDate[date] = [];
      }

      entriesByDate[date].push({ content: entry.numberOf, entryId: entry._id });
    });

    res.render("users/tracker/pushUpEntries", { entriesByDate });
  } catch (error) {
    return res.status(500).send("An error occurred while retrieving previous entries.");
  }
});


router.get("/entrieswater", isLoggedIn, async (req, res) => {
  try {
    const userId = req.session.currentUser._id;
    const entriesWater = await water.find({user: userId}).sort({ date: "desc" });

    const entriesByDate = {};

    entriesWater.forEach(entry => {
      if (entry.date) {
        const date = entry.date.toLocaleDateString("en-GB"); 

        if (!entriesByDate[date]) { 
          entriesByDate[date] = [];
        }
    
        entriesByDate[date].push({ content: entry.liters, entryId: entry._id });   
      }
    });

    

    res.render("users/tracker/waterEntries", { entriesByDate });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("An error occurred while retrieving previous entries.");
  }
});


router.get("/entriesyoga", isLoggedIn, async (req, res) => {
  try {
    const userId = req.session.currentUser._id;
    const entriesYoga = await yoga.find({user: userId}).sort({ date: "desc" });

    const entriesByDate = {};

    entriesYoga.forEach(entry => {
      if(entry.date) {
        const date = entry.date.toLocaleDateString("en-GB");

        if (!entriesByDate[date]) { entriesByDate[date] = [] }

        entriesByDate[date].push({ content: entry.minutes, entryId: entry._id});
      }
    });
    res.render("users/tracker/yogaEntries", { entriesByDate });
    //console.log(entriesYoga)
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("An error occurred while retrieving previous entries.");
  }
});
    


//Delete an user entry 
router.post("/entries/:habit/delete/:id", isLoggedIn, async (req, res) => {
  try {
    
    const habit = req.params.habit;
    const entryId = req.params.id;
    console.log(entryId, habit)
    let model;

    switch (habit) {
      case "pushups":
       model = pushUps;
        break;
      case "water":
       model = water;
        break;
      case "yoga":
       model = yoga;
        break;
      default:
        return res.status(404).send("Invalid habit");
    }
   
    const result = await model.findByIdAndDelete(entryId);
    

    if (result) {
      res.redirect(`/entries${habit}`);
    } else {
      res.status(404).send("Entry not found or not authorized to delete.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while deleting the entry: " + error.message);
  }
});

 module.exports = router

