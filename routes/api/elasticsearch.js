var express = require('express');
var elasticsearch = require('elasticsearch');

var router = express.Router();
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

/* GET users listing. */
router.get('/:index/', function (req, res, next) {
  client.search({
    index: req.params.index,
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

router.get('/:index/:value', function (req, res, next) {
  client.search({
    index: req.params.index,
    type: '',
    body: {
      query: {
        term :{
          "AppName": req.params.value
        }
      }
    }
  }).then(function (resp) {
    res.send(resp.hits.hits);
  }, function (err) {
    res.send(err.message);
  });
});

router.post('/:index/:type/', function (req, res, next) {
  client.create({
    index: req.params.index,
    type: req.params.index,
    body: req.body,
  }, function (error, response) {
    console.log(error);
    console.log(response);
    res.send(response);
  });
});

module.exports = router;
