//returns a object with key (startDate, endDate), with values are Date objects

function dayPeriod(d) {
  day = new Date(d);

  return {
    startDate: new Date(day.getFullYear(), day.getMonth(), day.getDate()),
    endDate: new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1),
  };
}

module.exports = dayPeriod;
