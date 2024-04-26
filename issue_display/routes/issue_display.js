var express = require("express");
const jira_api_controller = require("../controllers/issue_display");

var router = express.Router();

router.get("/welcome", jira_api_controller.welcome);

module.exports = router;
