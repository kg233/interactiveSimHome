//getMonthly.js
//use api to get the monthly total energy usage and return it in a readable string
//will further prompt the user to get the top 3 usage using getTop3.js
const monthPeriod = require('../utils/monthPeriod');
const roundKWh = require('../utils/roundKWh');

const axios = require('axios');

async function getMonthly(params) {
  //default to current month
  const { monthOrWeek } = params;
  let startDate;
  let endDate;

  if (monthOrWeek == '' || monthOrWeek == 'this month') {
    let d = monthPeriod();
    startDate = d.startDate;
    endDate = d.endDate;
  } else {
    today = new Date();
    startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    endDate = today;
  }

  try {
    let res = await axios.get(
      `${process.env.getTotalURL}?StartDate=${startDate}&EndDate=${endDate}`
    );

    if (res.data < 0.00000001) {
      return `you used no energy ${monthOrWeek} yet.`;
    }

    return `current total energy use for ${monthOrWeek} is ${roundKWh(
      res.data
    )} kilowatt hours. Would you like to know what are the top 3 energy consuming devices?`;
  } catch (err) {
    console.log(err);
    return `unable to get ${monthOrWeek}'s total, please try again`;
  }
}

module.exports = getMonthly;
