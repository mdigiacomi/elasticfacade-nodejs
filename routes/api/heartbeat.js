var express = require('express');
var elasticsearch = require('elasticsearch');

var router = express.Router();
var client = new elasticsearch.Client({
  host: 'home.michaeldigiacomi.com:9200',
  log: 'trace'
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: Infinity,

    // undocumented params are appended to the query string
    hello: "elasticsearch!"
  }, function (error) {
    if (error) {
      res.send('elasticsearch cluster is down!');
    } else {
      res.send('All is well');
    }
  });
});

module.exports = router;
