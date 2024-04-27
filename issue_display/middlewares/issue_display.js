var display = require("../controllers/result_display");
const jira_config = require("../config/jira.json");

exports.jira_issue_api = async(id) => {
    const response = await axios.get(jira_config.baseUrl + '/rest/api/2/issue/' + id, {
      auth: {
        username: jira_config.username,
        password: jira_config.password,
      },
    });
    return response.data;
};

exports.jira_search_api = async(id) => {
    const response = await axios.get(jira_config.baseUrl + '/rest/api/2/search', {
      auth: {
        username: jira_config.username,
        password: jira_config.password,
      },
      params: {
        jql: `key in (${issue_ids.join(",")})`,
        maxResults: 100,
      },
    });

    return response.data;
  
};