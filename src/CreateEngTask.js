const fs = require("fs");
const common = require("@bgroves/common");

module.exports = async function ({ client, cnc }) {
  let url = "https://graph.microsoft.com/v1.0/planner/tasks";
  const planId = "m3Mn8gTLUkiSykUcA_ja3GQAB_Io";
  const bucketId = "SFvEBnMmkkur0_1dAlW1L2QAHNFM";
  const userId = "a69026f5-9ff3-459a-a9e9-1ffb1bd43207";  // bgroves@buschegroup.com
  // const userId = "f2918d41-02a8-4b90-bccb-0ef013928298"; // kyoung@buschegroup.com
  common.log(`In CreateEngTask.url: ${url}`);
  const newTask = {
    planId: planId,
    bucketId: bucketId,
    title: "P558 6K LH Knuckles",
    assignments: {
      [userId]: {
        "@odata.type": "#microsoft.graph.plannerAssignment",
        orderHint: " ! !"
      }
    }
  }
  let task = await client.api(url).post(newTask);
  return task.id;
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