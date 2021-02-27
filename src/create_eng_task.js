const axios = require('axios');
const fs = require("fs");
//https://masteringjs.io/tutorials/axios/authorization

module.exports = async function ({ userAccessToken, cnc }) {
  let url = "https://graph.microsoft.com/v1.0/planner/tasks";
  const planId = "m3Mn8gTLUkiSykUcA_ja3GQAB_Io";
  const bucketId = "SFvEBnMmkkur0_1dAlW1L2QAHNFM";
  const userId = "a69026f5-9ff3-459a-a9e9-1ffb1bd43207";  // bgroves@buschegroup.com
  // const userId = "f2918d41-02a8-4b90-bccb-0ef013928298"; // kyoung@buschegroup.com

  let body = {
    planId: planId,
    bucketId: bucketId,
    title: "P558 6K LH Knuckles - Tool Life Issue",
    assignments: {
      [userId]: {
        "@odata.type": "#microsoft.graph.plannerAssignment",
        orderHint: " ! !"
      }
    }
  }
  console.log(`In CreateEngTask.url: ${url}`);
  const res = await axios.post(url, body, {
    headers: {
      Authorization: userAccessToken
    }
  });

  let data = res.data;
  return data.id;
//   let task = await client.api(url).post(newTask);
//   return task.id;
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