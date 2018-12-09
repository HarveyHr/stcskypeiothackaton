// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const _ = require('lodash');

const { ActivityTypes } = require('botbuilder');
const CosmosClient = require("@azure/cosmos").CosmosClient;

// const SENSORS = ['temperature'];
// const DEVICES = ['kitchen', 'living_room'];

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

class MyBot {
  /**
   *
   * @param {ConversationState} conversation state object
   */
  constructor(conversationState) {
    // Creates a new state accessor property.
    // See https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors.
    // this.countProperty = conversationState.createProperty(TURN_COUNTER_PROPERTY);
    // this.conversationState = conversationState;
  }
  /**
   *
   * @param {TurnContext} on turn context object.
   */
  async onTurn(turnContext) {
    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    if (turnContext.activity.type === ActivityTypes.Message) {
      
      //const inputMsg = turnContext.activity.text;
      // const { device, sensor } = _.split(inputMsg, ' ');

      // const [device, sensor] = [_.first(DEVICES), _.first(SENSORS)];
      const result = await this.getValueFromDeviceAndSensor();
      await turnContext.sendActivity(`Temperature: ${result.t} Lux: ${result.lux}`);
    } else {
      await turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
    }
    // Save state changes
    // await this.conversationState.saveChanges(turnContext);
  }

  async getValueFromDeviceAndSensor() {
    const container = cosmosClient.database(config.databaseId).container(config.containerId);

    const items = await container.items.query("SELECT * FROM c", { maxItemCount: 1 });
    items.current().then((item) => {
      const t = _.get(item.result, 't');
      const l = _.get(item.result, 'l');

      return { temperature: t, lux: l };
    });
  }
}

module.exports.MyBot = MyBot;

