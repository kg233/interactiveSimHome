require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { dialogflow, HtmlResponse } = require('actions-on-google');
const { devices, getEnergy, getMonthly, getTop3 } = require('./fulfillments/');

const dayPeriod = require('./utils/dayPeriod');

let hasScreen = false;

// ... app code here
const app = dialogflow({
  debug: true,
});

app.intent('welcome', (conv) => {
  if (conv.surface.capabilities.has('actions.capability.INTERACTIVE_CANVAS')) {
    hasScreen = true;
  }
  conv.ask('Welcome to Simhome smart auditor.');
});

app.intent('devices', (conv) => {
  return devices().then((resString) => {
    conv.ask(resString);
  });
});

app.intent('show', (conv) => {
  conv.ask(
    new HtmlResponse({
      url: `${conv.parameters.url}`,
    })
  );
});

app.intent('auditEnergy', (conv) => {
  return getEnergy(conv.parameters).then(({ id, result }) => {
    conv.add(result);
    if (id && hasScreen) {
      let period = conv.parameters.datePeriod;

      if (typeof conv.parameters.datePeriod === 'string') {
        period = dayPeriod(conv.parameters.datePeriod);
      }
      const { startDate, endDate } = period;
      let url = `https://pluto.calit2.uci.edu/#/sales/LineChart?id=${id}&startDate=${startDate}&endDate=${endDate}`;

      conv.ask(
        new HtmlResponse({
          url,
          updatedState: { test: 123 },
        })
      );
    }
  });
});

app.intent('monthlyTotal', (conv) => {
  return getMonthly(conv.parameters).then((resString) => {
    conv.add(resString);
  });
});

app.intent('getTop3', (conv) => {
  return getTop3().then((resString) => {
    conv.add(resString);
  });
});

const expressApp = express().use(bodyParser.json());

expressApp.post('/fulfillment', app);

expressApp.listen(process.env.PORT || 3000);
