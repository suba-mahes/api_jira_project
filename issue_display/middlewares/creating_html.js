const jira_config = require("../config/jira.json")
var display = require("../controllers/result_display");

exports.create_html = (data) => {
  try {

    let html_content = `<html>
      <head>
        <title>ISSUE_DETAILS</title>
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }

            th, td {
                text-align: left;
                padding: 8px;
            }

            tr:nth-child(even) {
                background-color: #f2f2f2
            }

            th {
                background-color: #4CAF50;
                color: white;
            }
        </style>
    </head>
    <body>
        <table style="width:100%">
        <tr>
          <th>#</th>
          <th>Issue NO</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
        </tr>`;

    data.forEach((item) => {
      html_content += `<tr>
          <td>1</td>
          <td><a href= ${jira_config.baseUrl}browse/${item.key} target="_blank">${item.key}</a></td>
          <td>${item.fields.summary}</td>
          <td>${item.fields.description}</td>
          <td>${item.fields.status.name}</td>
        </tr>`;
    });

    html_content += `</table>
    </body>
    </html>`;

    return html_content;
  } catch (err) {
    display.end_error_result(res, err);
  }
};
