const axios = require('axios');
const fs = require("fs");
//https://masteringjs.io/tutorials/axios/authorization

module.exports = async function ({ userAccessToken, taskId, etag }) {
  let url = `https://graph.microsoft.com/v1.0/planner/tasks/${taskId}/details`;
  let body = {
    references: {
        "https%3A//buschecnc%2Esharepoint%2Ecom/%3Af%3A/s/Engineering/EhEkDeux43tKt5ktvEYr_ekB4UKgASUdZ-spirZW-1Hbpw": {
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