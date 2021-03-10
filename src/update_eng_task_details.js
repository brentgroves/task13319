const axios = require('axios');
const fs = require("fs");
//https://masteringjs.io/tutorials/axios/authorization
// https://graph.microsoft.com/v1.0/groups/3f29dd5d-9118-4747-b72f-c086ab22d7bb/drive/items/016VYMZDAREQG6XMPDPNFLPGJNXRDCX7PJ/createLink
//https://buschecnc.sharepoint.com/:f:/s/Engineering/Em3qxiLwJ8xLodJ6y6LZgVcBGUb0-cZ5fIhYEu2wNhea7g

module.exports = async function ({ userAccessToken, taskId, etag }) {
  let url = `https://graph.microsoft.com/v1.0/planner/tasks/${taskId}/details`;
  let link = "https://buschecnc.sharepoint.com/:f:/s/Engineering/Em3qxiLwJ8xLodJ6y6LZgVcBGUb0-cZ5fIhYEu2wNhea7g"
  let reference = link.replace(/:/g,'%3A').replace(/\./g,'%2E');
  // https://docs.microsoft.com/en-us/graph/api/resources/plannerexternalreferences?view=graph-rest-1.0
  //https://stackoverflow.com/questions/38568021/using-the-beta-microsoft-graph-api-updating-task-details-with-an-external-refer
  //string receivedUrlString = "http:\/\/somewebsite.com\/somepage.asp";<br />
  // https://stackoverflow.com/questions/38011896/planner-badrequest-when-updating-task-details
  let body = {
    references: {
        // "https%3A//buschecnc%2Esharepoint%2Ecom/%3Af%3A/s/Engineering/EhEkDeux43tKt5ktvEYr_ekB4UKgASUdZ-spirZW-1Hbpw": {
          [reference] : {
            "@odata.type": "#microsoft.graph.plannerExternalReference",
            alias: "Resource Folder",
            type: "Other",
            previewPriority: " !"
        }
    }
  }
  const res = await axios.patch(url, body, {
    headers: {
      Authorization: userAccessToken,
      "If-Match":etag
    }
  });

  let data = res.data;
  return data.id;
//   let task = await client.api(url).post(newTask);
//   return task.id;
};
/*
{
    "references": {
        "https%3A//buschecnc%2Esharepoint%2Ecom/%3Af%3A/s/Engineering/EhEkDeux43tKt5ktvEYr_ekB4UKgASUdZ-spirZW-1Hbpw": {
            "@odata.type": "#microsoft.graph.plannerExternalReference",
            "alias": "Resource Folder",
            "type": "Other",
            "previewPriority": " !"
        }
    }
}
*/