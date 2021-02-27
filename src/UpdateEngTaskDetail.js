const fs = require("fs");
const common = require("@bgroves/common");

module.exports = async function ({ client, taskId,etag }) {
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
};
/*
    const config = {
        method: 'get',
        url: 'http://webcode.me',
        headers: { 'User-Agent': 'Axios - console app' }
    }

    let res = await axios(config)

    console.log(res.request._header);

    const body = {
      client_id: APP_ID,
      client_secret: APP_SECERET,
      userName: USER_NAME,
      password: PASSWORD,
      scope: "https://graph.microsoft.com/.default",
      grant_type: GRANT_TYPE,
    };
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios.defaults.headers.patch["If-Match"] =
      "W/\"JzEtVGFza0RldGFpbHMgQEBAQEBAQEBAQEBAQEBAWCc=\"";
    try {
      let response = await axios.post(url, qs.stringify(body));

      if (response.status == 200) {
        return response.data.access_token;
      } else {
        throw new Error("Non 200OK response on obtaining token...");
      }
    } catch (error) {
      throw new Error("Error on obtaining token...");
    }

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
