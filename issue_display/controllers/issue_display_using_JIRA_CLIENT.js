const jira_API = require("jira-client");
var display = require("./result_display");
const create_html_middleware = require("../middlewares/creating_html");
const middleware = require("../middlewares/issue_display");
const jira_config = require("../config/jira.json");

exports.using_JIRA_CLIENT_searchJira = async (req, res) => {
  try {
    if (!req.query.id) {
      display.end_result(res, 404, { message: "id has to be send in query" });
      return;
    }

    const issue_ids = Array.isArray(req.query.id)
      ? req.query.id
      : [req.query.id];
    //const issue_ids = ["PROJ-1"];

    // const jira = new jira_API({
    //   protocol: "https",
    //   host: jira_config.host,
    //   username: jira_config.username,
    //   password: jira_config.password,
    //   apiVersion: "2",
    //   strictSSL: true,
    // });

    const jira = await middleware.jira_client();

    const jql = `key in (${issue_ids.join(",")})`;
    const response = await jira.searchJira(jql);

    let html_data = await create_html_middleware.create_html(response.issues);

    res.send(html_data);
  } catch (err) {
    display.end_error_result(res, err);
  }
};

exports.using_JIRA_CLIENT_findIssue = async (req, res) => {
  try {
    if (!req.query.id) {
      display.end_result(res, 404, { message: "id has to be send in query" });
      return;
    }

    const issue_ids = Array.isArray(req.query.id)
      ? req.query.id
      : [req.query.id];
    //const ids = ["PROJ-1"];

    // const jira = new jira_API({
    //   protocol: "https",
    //   host: jira_config.host,
    //   username: jira_config.username,
    //   password: jira_config.password,
    //   apiVersion: "2",
    //   strictSSL: true,
    // });

    const jira = await middleware.jira_client();

    const All_details = [];
    for (const id of issue_ids) {
      const response = await jira.findIssue(id);
      All_details.push(response);
    }

    let html_data = await create_html_middleware.create_html(All_details);

    res.send(html_data);
  } catch (err) {
    display.end_error_result(res, err);
  }
};

