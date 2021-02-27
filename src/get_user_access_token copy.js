// https://login.microsoftonline.com/{{TenantID}}/oauth2/v2.0/token
const axios = require('axios');
const qs = require("qs");


const TENNANT_ID = "b4b87e8f-df64-41ff-9ba4-a4930ebc804b";
const APP_ID = "b5615dbe-0af5-49fd-ab09-803e91be7bd9";
const APP_SECERET = "L9c1qlg8x1CfH8StSyfVtkB23vD-C~-.x.";
const USER_NAME = "bgroves@buschegroup.com";
const PASSWORD = "JesusLives4!";
// const GRANT_TYPE = "client_credentials";
const GRANT_TYPE = "password";


module.exports = async function () {
  const url = `https://login.microsoftonline.com/${TENNANT_ID}/oauth2/v2.0/token`
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
//   axios.defaults.headers.patch["If-Match"] =
//     "W/\"JzEtVGFza0RldGFpbHMgQEBAQEBAQEBAQEBAQEBAWCc=\"";
  try {
    let response = await axios.post(url, qs.stringify(body));

    if (response.status == 200) {
        let data = response.data;
        // console.log(data.access_token);
        return response.data.access_token;
    } else {
      throw new Error("Non 200OK response on obtaining token...");
    }
  } catch (error) {
    throw new Error("Error on obtaining token...");
  }

}

