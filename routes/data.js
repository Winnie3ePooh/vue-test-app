const utils = require('../utils/utils.js');
const express = require('express');
const router = express.Router();
const db = require('../db/db');
const moment = require('moment');


router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post('/', (req,res) => {
  let queryString;
  let dates;
  if(req.body.dateRange === ''){
    queryString = 'date BETWEEN NOW() - INTERVAL 30 DAY AND NOW()';
    dates = utils.getDates(moment().add('-30','days'),moment());
  }
  else {
    queryString = `date BETWEEN STR_TO_DATE('${req.body.dateRange[0]}',\'%Y-%m-%d\') ` +
    `AND STR_TO_DATE('${req.body.dateRange[1]}','%Y-%m-%d')`;
    dates = utils.getDates(req.body.dateRange[0],
                           req.body.dateRange[1]);
  };
	db.getConnection(function(err, connection) {
	  connection.query('SELECT COUNT(event) as event_count, SUM(event_value) as event_val,event,' +
      'date FROM stats ' +
      'WHERE partner_id=? AND '+ queryString +
      'GROUP BY event,date', [req.body.userID], function (error, results, fields) {
        connection.release();
        let visits = [], regs = [], pays = [];
        if(results === undefined || results.length == 0){
        }
        else {
          results.forEach(el => utils.dateFormatter(el,'MM-DD-YYYY'));
          visits = results.filter(item => item.event === 'LINK_VISITOR');
          regs = results.filter(item => item.event === 'REGISTRATION');
          pays = results.filter(item => item.event === 'PAYMENT');
        };
        dates.forEach(el => {
          if(visits.find(item => item.date === el ) === undefined ) visits.push({event_count:0,date:el});
          if(regs.find(item => item.date === el ) === undefined ) regs.push({event_count:0,date:el});
          if(pays.find(item => item.date === el ) === undefined ) pays.push({event_val:0,date:el});}
        );
        res.json({date: dates,
          visits: visits.sort(utils.sortByDate),
          regs: regs.sort(utils.sortByDate),
          pays: pays.sort(utils.sortByDate)});
        if (error) throw error;
	  });
	  if (err) res.send(err);
	});
})

module.exports = router;
