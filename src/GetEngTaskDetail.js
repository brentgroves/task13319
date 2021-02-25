const fs = require("fs");
const common = require("@bgroves/common");

module.exports = async function ({ client, taskId }) {
  let url = `https://graph.microsoft.com/v1.0/planner/tasks/${taskId}/details`;
  common.log(`In GetEngTaskDetail.url: ${url}`);
  let taskDetail = await client.api(url).get();
  return {
    id: taskDetail.id,
    etag: taskDetail['@odata.etag']
  };
};
/*
{
  "planId": "{{PlanId}}",
  "bucketId": "{{BucketId}}",
  "title": "Task 02/25-14:09",
  "assignments": {
    "{{UserId}}": {
      "@odata.type": "#microsoft.graph.plannerAssignment",
      "orderHint": " ! !"
    }
  }
}
*/