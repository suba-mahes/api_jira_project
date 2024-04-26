const axios = require("axios");

var display = require("./result_display");
const create_html_middleware = require("../middlewares/creating_html");
const jira_api_middleware = require("../middlewares/issue_display");
const jira_config = require("../config/jira.json");

exports.welcome_using_JIRA_API = async (req, res) => {
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
      //All_details.push(jira_api_middleware.jira_api(id));
      const response = await axios.get(jira_config.apiUrl + id, {
        auth: {
          username: jira_config.username,
          password: jira_config.password,
        },
      });
      All_details.push(response.data);
    }

    let html_data = await create_html_middleware.create_html(All_details);

    res.send(html_data);
  } catch (err) {
    display.end_error_result(res, err);
  }
};

exports.welcome_using_JIRA_client = async (req, res) => {
  try {
    if (!req.query.id) {
      display.end_result(res, 404, { message: "id has to be send in query" });
      return;
    }
    const issue_ids = Array.isArray(req.query.id)
      ? req.query.id
      : [req.query.id];
    //const issue_ids = ["MSP-1","PROJ-1"];

    const jira = new JiraApi({
      protocol: "https",
      host: jira_config.baseUrl,
      username: jira_config.username,
      password: jira_config.password,
      apiVersion: "2",
      strictSSL: true,
    });

    jira.findIssue(issue_ids,  async(error, data) => {
      if (error) {
        display.end_error_result(res, error);

      } else {
        let html_data = await create_html_middleware.create_html(All_details);

    res.send(html_data);
      }
  });
    // for (const id of issue_ids) {
    //   //All_details.push(jira_api_middleware.jira_api(id));
    //   const response = await axios.get(jira_config.apiUrl + id, {
    //     auth: {
    //       username: jira_config.username,
    //       password: jira_config.password,
    //     },
    //   });
    //   All_details.push(response.data);
    // }

    // let html_data = create_html_middleware.create_html(All_details);

    // res.send(html_data);
  } catch (err) {
    display.end_error_result(res, err);
  }
};


  