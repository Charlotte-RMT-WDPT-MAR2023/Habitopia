const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const router = require("express").Router();

const { pushUps, water, yoga } = require("../models/HabitsTracker.model.js");

router.get("/habits", (req, res) => res.render("users/tracker/habits"));
router.get("/addhabit", (req, res) => res.render("users/tracker/add-habit"));
router.get("/details", (req, res) => res.render("users/tracker/details"));

 
// Habits Tracker Page GET routes
router.get("/pushups", (req, res) => {
  res.render("users/tracker/pushup");
});

router.get("/yoga", (req, res) => {
  res.render("users/tracker/yoga");
})

router.get("/water", (req, res) => {
  res.render("users/tracker/water")
})


//POST routes for each habit

router.post("/pushups", (req, res) => {
  const { numberOf } = req.body;

  const newPushUps = new pushUps({
    numberOf,
    date: new Date() // Set the date to the current date
  });

  newPushUps
    .save()
    .then(() => {
      res.redirect("/entriespushup");
    })
    .catch((error) => {
      console.log("Error saving data:", error);
      res.redirect("/error");
    });
});


router.post("/water", (req, res) => {
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


router.post("/yoga", (req, res) => {
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

router.get("/entriespushup", async (req, res) => {
  try {
    const entriesPushUps = await pushUps.find().sort({ createdAt: "desc" });

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
router.get("/entrieswater", async (req, res) => {
  try {
    const entriesWater = await water.find().sort({ createdAt: "desc" });

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
router.get("/entriesyoga", async (req, res) => {
  try {
    const entriesYoga = await yoga.find().sort({ createdAt: "desc" });

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








router.get("/entriesyoga", async (req, res) => {
  try {
    const currentEntryCreatedAt = new Date();

    const previousEntries = await entriesYoga.find({
      createdAt: { $lt: currentEntryCreatedAt },
    })
      .sort({ createdAt: -1 })
      .exec();

    if (previousEntries.length === 0) {
      console.log("No previous entries found.");
      return res.send("No previous entries found.");
    }

    const options = { weekday: "short", year: "numeric", month: "long", day: "numeric" };

    const formattedEntries = previousEntries.map(entry => ({
      createdAt: new Date(entry.createdAt).toLocaleDateString("en-US", options),
      content: entry.content,
    }));

    return res.render("users/tracker/yogaEntries", {
      entries: formattedEntries,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .send("An error occurred while retrieving the previous entries.");
  }
});




module.exports = router;