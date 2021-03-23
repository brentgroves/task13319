const mqtt = require("mqtt");
const ProcessTask = require("./process_task");
const common = require("@bgroves/common");

var mqttClient;

var { MQTT_SERVER, MQTT_PORT } = process.env;

async function main() {
  try {
    common.log(`Starting task13319`);
    common.log(`MQTT_SERVER=${MQTT_SERVER},MQTT_PORT=${MQTT_PORT}`);
    const mqttClient = mqtt.connect(`mqtt://${MQTT_SERVER}:${MQTT_PORT}`);

    mqttClient.on("connect", function () {
      mqttClient.subscribe("CreateEngTask", function (err) {
        if (!err) {
          common.log("task13319 subscribed to: CreateEngTask");
        }
      });
    });
    // message is a buffer
    mqttClient.on("message", function (topic, message) {
      const obj = JSON.parse(message.toString()); // payload is a buffer
      common.log(`task13319.mqtt => ${message.toString()}`);
  
      ProcessTask({subFolderId:obj.subFolderId});
    });
  } catch (e) {
    console.error(e.name + ": " + e.message);
  }
}
main();
/*
https://nodesource.com/blog/understanding-streams-in-nodejs/
https://docs.microsoft.com/en-us/graph/api/driveitem-createuploadsession?view=graph-rest-1.0
https://stackoverflow.com/questions/62436697/how-to-upload-a-local-file-into-sharepoint-using-graph-api
https://stackoverflow.com/questions/60758259/how-to-add-binary-data-in-microsoft-graph-api-for-uploading-file-using-upload-se
https://stackoverflow.com/questions/55919294/upload-an-image-file-to-sharepoint-via-api-graph
*/
