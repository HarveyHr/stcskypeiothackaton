const _ = require('lodash');
const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
  host: "https://nodbskypeiothack.documents.azure.com:443/",
  authKey: "XXJp9kRNbq7oqGC42gFBO1VL6BpZWqMMfoJeTiOHrZIrXPyxL5lQ6BnLWX9uayWMfj6CN5p3kAHWrL5L8AuXtg==",
  databaseId: "skypeSens",
  containerId: "iotIn",
};

const cosmosClient = new CosmosClient({
  endpoint: config.host,
  auth: {
    masterKey: config.authKey
  }
});

(async () => {
  try {
    const container = cosmosClient.database(config.databaseId).container(config.containerId);

    const items = await container.items.query("SELECT * FROM c", { maxItemCount: 1 });
    items.current().then((item) => {
      const t = _.get(item.result, 't');
      const l = _.get(item.result, 'l');

      console.log(`t=${t} l=${l}`);
    });
    
  } catch (e) {
    console.error("ERROR");
    console.error(e);
  }
})();

