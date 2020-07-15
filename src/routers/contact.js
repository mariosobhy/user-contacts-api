const express = require("express");
const Contact = require("../models/contact");
const auth = require("../middleware/auth");
const contactController = require("../controllers/contact");
const router = new express.Router();

router.route("/contacts/addContact").post(auth, contactController.addContact);
router.route("/contacts/getList").get(auth, contactController.getList);
router.route("/contacts/getRecentList").get(auth, contactController.getRecentList);
router.route("/contacts/getSharedList").get(auth, contactController.getSharedList);

module.exports = router;