var express = require('express');
var elasticsearch = require('elasticsearch');

var router = express.Router();
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  client.search({
    index: 'appinfo',
    type: '',
    body: {
      query: {
        match: {
          body: ''
        }
      }
    }
  }).then(function (resp) {
    res.send(resp.hits.hits);
  }, function (err) {
    res.send(err.message);
  });
});

router.post('/', function (req, res, next) {
  client.create({
    index: 'appinfo',
    type: 'appinfo',
    body: req.body,
  }, function (error, response) {
    console.log(error);
    console.log(response);
    res.send(response);
  });
});

module.exports = router;
