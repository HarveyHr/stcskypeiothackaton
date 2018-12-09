// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes } = require('botbuilder');
const _ = require('lodash');

const CosmosClient = require("@azure/cosmos").CosmosClient;

// Turn counter property
const TURN_COUNTER_PROPERTY = 'turnCounterProperty';

const SENSORS = ['temperature'];
const DEVICES = ['kitchen', 'living_room'];

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

class MyBot {
  /**
   *
   * @param {ConversationState} conversation state object
   */
  constructor(conversationState) {
    // Creates a new state accessor property.
    // See https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors.
    this.countProperty = conversationState.createProperty(TURN_COUNTER_PROPERTY);
    this.conversationState = conversationState;
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

      const [device, sensor] = [_.first(DEVICES), _.first(SENSORS)];
      const valueFromDeviceAndSensor = await this.getValueFromDeviceAndSensor(device, sensor);

      await turnContext.sendActivity(`${device} ${sensor} ${valueFromDeviceAndSensor}`);
    } else {
      await turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
    }
    // Save state changes
    await this.conversationState.saveChanges(turnContext);
  }

  async getValueFromDeviceAndSensor(string device, string sensor) {
    return 25;
  }
}

module.exports.MyBot = MyBot;

