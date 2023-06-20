
const router = require("express").Router();

router.get("/checkin", (req, res) => res.render("users/check-in"));
router.get("/journal", (req, res) => res.render("users/journal"));
router.get("/habits", (req, res) => res.render("users/habits"));

module.exports = router;