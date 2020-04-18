const express = require('express');
const bodyParser = require('body-parser');
const { dialogflow, HtmlResponse } = require('actions-on-google');
const devices = require('./fulfillments/devices');

// ... app code here
const app = dialogflow({
  debug: true,
});

app.intent('welcome', (conv) => {
  if (!conv.surface.capabilities.has('actions.capability.INTERACTIVE_CANVAS')) {
    conv.close('Sorry, this device does not support Interactive Canvas!');
    return;
  }
  conv.ask("Welcome! I don't know what im doing!");
});

app.intent('devices', (conv) => {
  console.log('received intent devices: ', conv);
  return devices().then((resString) => {
    conv.ask(resString);
  });
});

const expressApp = express().use(bodyParser.json());

expressApp.post('/fulfillment', app);

expressApp.listen(3000);
