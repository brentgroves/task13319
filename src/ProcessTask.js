const mqtt = require("mqtt");
const common = require("@bgroves/common");
const GetClient = require("./GetClient");
const CreateEngTask = require("./CreateEngTask");
const UpdateEngTaskDetail = require("./UpdateEngTaskDetail");
const GetEngTaskDetail = require("./GetEngTaskDetail");

module.exports = async function () {
  common.log(`in task.main`);
  let client = GetClient();
  let cnc = '103';
  let taskId = await CreateEngTask({
    client,
    cnc
  });
  common.log(`taskId:${taskId}`);
  const {id, etag} = await GetEngTaskDetail({
    client,
    taskId
  });
  common.log(`taskDetailId:${id},etag:${etag}`);

  let taskDetailsId = await UpdateEngTaskDetail({
    client,
    taskId,
    etag
  });
  common.log(`Updated taskDetailsId:${taskDetailsId}`);
};
