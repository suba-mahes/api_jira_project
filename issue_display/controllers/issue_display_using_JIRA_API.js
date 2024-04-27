const axios = require("axios");
var display = require("./result_display");
const create_html_service = require("../services/creating_html");
const jira_service = require("../services/issue_display");
const jira_config = require("../config/jira.json");

exports.using_JIRA_SEARCH_API = async (req, res) => {
  try {
    if (!req.query.id) {
      display.end_result(res, 404, { message: "id has to be send in query" });
      return;
    }
    const issue_ids = Array.isArray(req.query.id)
      ? req.query.id
      : [req.query.id];
    //const issue_ids = ["MSP-1","PROJ-1"];

    const response = await jira_service.jira_search_api(issue_ids);
    let html_data = await create_html_service.create_html(response.issues);

    // const response = await axios.get(
    //   jira_config.baseUrl + "/rest/api/2/search",
    //   {
    //     auth: {
    //       username: jira_config.username,
    //       password: process.env.JIRA_API_TOKEN,
    //     },
    //     params: {
    //       jql: `key in (${issue_ids.join(",")})`,
    //       maxResults: 100,
    //     },
    //   }
    // );

    // let html_data = await create_html_service.create_html(
    //   response.data.issues
    // );

    res.send(html_data);
  } catch (err) {
    display.end_error_result(res, err);
  }
};

exports.using_JIRA_ISSUE_API = async (req, res) => {
  try {
    if (!req.query.id) {
      display.end_result(res, 404, { message: "id has to be send in query" });
      return;
    }
    const issue_ids = Array.isArray(req.query.id)
      ? req.query.id
      : [req.query.id];
    //const issue_ids = ["MSP-1","PROJ-1"];

    const All_details = [];
    for (const id of issue_ids) {
      All_details.push(await jira_service.jira_issue_api(id));
      //   const response = await axios.get(
      //     jira_config.baseUrl + "/rest/api/2/issue/" + id,
      //     {
      //       auth: {
      //         username: jira_config.username,
      //         password: process.env.JIRA_API_TOKEN,
      //       },
      //     }
      //   );
      //  All_details.push(response.data);
    }
    let html_data = await create_html_service.create_html(All_details);

    res.send(html_data);
  } catch (err) {
    display.end_error_result(res, err);
  }
};
