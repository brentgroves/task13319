const axios = require('axios');
const qs = require("qs");
//https://masteringjs.io/tutorials/axios/authorization

module.exports = async function ({userAccessToken,taskId}) {
  const url = `https://graph.microsoft.com/v1.0/planner/tasks/${taskId}/details`;
  try {
    const response = await axios.get(url, {
      headers: {
        authorization: userAccessToken
      }
    });

    if (response.status == 200) {
        let data = response.data;
        return {
          taskDetailsId:data.id,
          etag:data["@odata.etag"]
        }
    } else {
      throw new Error("Non 200OK response on obtaining task detail...");
    }
  } catch (error) {
    throw error;
  }

}

