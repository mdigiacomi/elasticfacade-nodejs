var express = require('express');
var elasticsearch = require('elasticsearch');

var router = express.Router();
var client = new elasticsearch.Client({
  host: 'home.michaeldigiacomi.com:9200',
  log: 'trace'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index API' });
});


router.put('/:index/', function (req, res, next) {

  console.log("Index Name: " + req.params.index);
  console.log("Index Specs: " + JSON.stringify(req.body));

  client.indices.create({
    index: req.params.index,
    body: req.body,
  }, function (error, response) {
    console.log(error);
    console.log(response);
    res.send(response);
  });
});

router.get('/:index/', function (req, res, next) {
  client.indices.get({
    index: req.params.index,
    type: ''
  }).then(function (resp) {
    res.send(resp);
  }, function (err) {
    res.send(err.message);
  });
});

module.exports = router;
