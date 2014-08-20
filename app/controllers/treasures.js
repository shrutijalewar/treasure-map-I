'use strict';
var Treasure = require('../models/treasure');

exports.init = function(req, res){
  res.render('treasures/init');
};

exports.index = function(req, res){
  Treasure.all(function(err, treasures){
    res.render('treasures/index',{treasures:treasures});
  });
};

exports.create = function(req, res){
  Treasure.create(req.body, function(){
    res.redirect('/treasures');
  });
};

exports.show = function(req, res){
  Treasure.findById(req.params.id, function(treasure){
    res.render('treasures/show',{treasure:treasure});
  });
};
