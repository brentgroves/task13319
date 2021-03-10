const axios = require('axios');
const fs = require("fs");
//https://masteringjs.io/tutorials/axios/authorization
// https://graph.microsoft.com/v1.0/groups/3f29dd5d-9118-4747-b72f-c086ab22d7bb/drive/items/016VYMZDAREQG6XMPDPNFLPGJNXRDCX7PJ/createLink

module.exports = async function ({ userAccessToken }) {
  let groupId = "3f29dd5d-9118-4747-b72f-c086ab22d7bb"; // Engineering
  let issueFolderId = "016VYMZDDN5LDCF4BHZRF2DUT2ZORNTAKX"; // Issue210308172828
  let url = `https://graph.microsoft.com/v1.0/groups/${groupId}/drive/items/${issueFolderId}/createLink`;
  
  let body = {
    type: "edit",
    scope: "organization"
  }

  console.log(`In CreateEngIssueFolderLink.url: ${url}`);
  const res = await axios.post(url, body, {
    headers: {
      Authorization: userAccessToken
    }
  });

  let data = res.data;
  return {
    webURL:data.link.webUrl
  };
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