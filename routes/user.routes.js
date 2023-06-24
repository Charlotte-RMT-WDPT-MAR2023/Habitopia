const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const router = require("express").Router();

const { pushUps, water, yoga } = require("../models/HabitsTracker.model.js");

router.get("/habits", (req, res) => res.render("users/habits"));
router.get("/addhabit", (req, res) => res.render("users/add-habit"));
router.get("/track", (req, res) => res.render("users/track"));
router.get("/details", (req, res) => res.render("users/details"));

module.exports = router;