const _ = require('lodash');
const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {};

config.host = process.env.HOST || "https://nodbskypeiothack.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "XXJp9kRNbq7oqGC42gFBO1VL6BpZWqMMfoJeTiOHrZIrXPyxL5lQ6BnLWX9uayWMfj6CN5p3kAHWrL5L8AuXtg==";
config.databaseId = "nodbskypeiothack";
// config.containerId = "";

const cosmosClient = new CosmosClient({
  endpoint: config.host,
  auth: {
    masterKey: config.authKey
  }
});

console.log("init");

(async () => {
  try {
    console.log("Listing all databases");
    const allDatabases = await cosmosClient.databases.readAll();
    allDatabases.forEach((result) => {
      console.log(result);
    });
  } catch (e) {
    console.error("ERROR");
    console.error(e);
  }
})();

