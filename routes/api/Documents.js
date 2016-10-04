var express = require('express');
var elasticsearch = require('elasticsearch');

var router = express.Router();
var client = new elasticsearch.Client({
  host: 'home.michaeldigiacomi.com:9200',
  log: 'trace'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
    type: req.params.type,
    id: 0,
    body: req.body,
  }, function (error, response) {
    console.log(error);
    console.log(response);
    res.send(response);
  });
});

module.exports = router;
