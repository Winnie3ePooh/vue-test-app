const moment = require('moment');

function sortByDate(a,b) {
  return new Date(a.date) - new Date(b.date);
}

function dateFormatter(el,frmt) {
  el.date = moment(el.date,('YYYY-MM-DD h:mm:ss')).format(frmt);2
}

function getDates(startDate, stopDate) {
  var dateArray = [];
  var currentDate = moment(startDate);
  var stopDate = moment(stopDate);
  while (currentDate <= stopDate) {
    dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}

module.exports = {
  sortByDate,dateFormatter,getDates
}
