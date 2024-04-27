var express = require("express");
const jira_api_controller = require("../controllers/issue_display");

var router = express.Router();

router.get(
  "/using-JIRA_ISSUE_API",
  jira_api_controller.using_JIRA_ISSUE_API
);

router.get(
  "/using-JIRA_SEARCH_API",
  jira_api_controller.using_JIRA_SEARCH_API
);

router.get("/using-JIRA_client", jira_api_controller.using_JIRA_client);

module.exports = router;
