const fs = require("fs");
const common = require("@bgroves/common");

module.exports = async function ({ client, taskId,etag }) {
  let url = `https://graph.microsoft.com/v1.0/planner/tasks/${taskId}/details`;
  common.log(`In UpdateEngTaskDetail.url: ${url}`);
  const updTaskDetail = {
    references: {
      "https%3A//buschecnc%2Esharepoint%2Ecom/%3Af%3A/s/Engineering/EhEkDeux43tKt5ktvEYr_ekB4UKgASUdZ-spirZW-1Hbpw": {
        "@odata.type": "#microsoft.graph.plannerExternalReference",
        alias: "Resource Folder",
        type: "Other",
        previewPriority: " !",
      },
    }
  };
  let taskDetail = await client.api(url).patch(updTaskDetail);
  return taskDetail.id;
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
