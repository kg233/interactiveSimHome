require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { dialogflow, HtmlResponse } = require('actions-on-google');
const { devices, getEnergy } = require('./fulfillments/');

const projectId = process.env.FIREBASE_CONFIG;

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
  // console.log('received intent devices: ', conv);
  // return devices().then((resString) => {
  //   conv.ask(resString);
  //   conv.ask(
  //     new HtmlResponse({
  //       data: { key: 'hello' },
  //     })
  //   );
  // });
  conv.ask('sending response');
  conv.ask(
    new HtmlResponse({
      data: {
        instructions: true,
      },
    })
  );
});

app.intent('show', (conv) => {
  conv.ask('what is going to happen');
  conv.ask(
    new HtmlResponse({
      url: `https://1b136012.ngrok.io`,
    })
  );
});

app.intent('auditEnergy', (conv) => {
  return getEnergy(conv.parameters).then((resString) => {
    conv.add(resString);
  });
});

const expressApp = express().use(bodyParser.json());

expressApp.post('/fulfillment', app);

expressApp.listen(process.env.PORT || 3000);
