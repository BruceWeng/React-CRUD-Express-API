var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var parseJson = bodyParser.json();
var Product = require('../models/Product');

router.route('/')
  .get(function(req, res) {
    Product.find(function(err, products) {
      if (!err) {
        res.json(products);
      } else {
        console.log(err);
      }
    });
  })
  .post(parseUrlencoded, parseJson, function(req, res) {
    var product = new Product({
      title: req.body.title,
      description: req.body.description,
      style: req.body.style
    });
    product.save(function(err) {
      if (!err) {
        console.log('Created!');
      } else {
        console.log(err);
      }
    });
    res.json(product);
  });

router.route('/:id')
  .get(function(req, res) {
    Product.findById(req.params.id, function(err, product) {
      if (!err) {
        res.json(product);
      } else {
        console.log(err);
      }
    });
  })
  // Remember to ad parseUrlencoded and parseJson when use body
  .put(parseUrlencoded, parseJson, function(req, res) {
    Product.findById(req.params.id, function(err, product) {
      if (err) {
        console.log(err);
      }

      product.title = req.body.title;
      product.description = req.body.description;
      product.style = req.body.style;
      product.save(function(err) {
        if (!err) {
          console.log('Updated!');
        } else {
          console.log(err);
        }
      });
      res.json(product);
    });
  })
  .delete(function(req, res) {
    Product.findById(req.params.id, function(err, product) {
      product.remove(function(err) {
        if (!err) {
          console.log('Removed!');
        } else {
          console.log(err);
        }
      });
    });
  });

module.exports = router;
