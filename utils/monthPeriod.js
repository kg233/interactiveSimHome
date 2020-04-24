//get the month range for this month
//returns a object with key (startDate, endDate), with values are Date objects

function monthPeriod() {
  let today = new Date();

  return {
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear(), today.getMonth() + 1, 1),
  };
}

module.exports = monthPeriod;
