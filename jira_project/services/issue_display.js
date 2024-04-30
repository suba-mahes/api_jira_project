const axios = require("axios");
const jira_API = require("jira-client");

const jira_config = require("../config/jira.json");

exports.jira_client = async () => {
  const jira = new jira_API({
    protocol: "https",
    host: jira_config.host,
    username: jira_config.username,
    password: process.env.JIRA_API_TOKEN,
    apiVersion: "2",
    strictSSL: true,
  });
  return jira;
};

exports.jira_issue_api = async (id) => {
  const response = await axios.get(
    jira_config.baseUrl + "/rest/api/2/issue/" + id,
    {
      auth: {
        username: jira_config.username,
        password: process.env.JIRA_API_TOKEN,
      },
    }
  );
  return response.data;
};

exports.jira_search_api = async (issue_ids) => {
  const response = await axios.get(jira_config.baseUrl + "/rest/api/2/search", {
    auth: {
      username: jira_config.username,
      password: process.env.JIRA_API_TOKEN,
    },
    params: {
      jql: `key in (${issue_ids.join(",")})`,
      maxResults: 100,
    },
  });

  return response.data;
};
