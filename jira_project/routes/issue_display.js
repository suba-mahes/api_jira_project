var express = require("express");
const jira_api_controller = require("../controllers/issue_display_using_JIRA_API");
const jira_client_controller = require("../controllers/issue_display_using_JIRA_CLIENT");

var router = express.Router();

router.get(
  "/using-JIRA_ISSUE_API",
  jira_api_controller.using_JIRA_ISSUE_API
);

router.get(
  "/using-JIRA_SEARCH_API",
  jira_api_controller.using_JIRA_SEARCH_API
);

router.get("/using-JIRA_client_issue", jira_client_controller.using_JIRA_CLIENT_findIssue);
router.get("/using-JIRA_client_search", jira_client_controller.using_JIRA_CLIENT_searchJira);

module.exports = router;
