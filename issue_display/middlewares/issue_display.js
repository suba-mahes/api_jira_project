var display = require("../controllers/result_display");
const jira_config = require("../config/jira.json");

exports.jira_api = async(id) => {
  try {
    const auth = {
      username: jira_config.username,
      password: jira_config.password
    };
  
    const response = await axios.get(jira_config.apiUrl + id, { auth });

    return response.data;
  } catch (err) {
    display.end_error_result(res, err);
  }
};
