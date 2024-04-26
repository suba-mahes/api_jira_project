var express = require("express");
const jira_api_controller = require("../controllers/issue_display");

var router = express.Router();

router.get(
  "/welcome-using-JIRA_API",
  jira_api_controller.welcome_using_JIRA_API
);
router.get(
  "/welcome-using-JIRA_client",
  jira_api_controller.welcome_using_JIRA_client
);

module.exports = router;
