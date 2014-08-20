'use strict';
var Mongo = require('mongodb'),
    _     = require('lodash');

function Treasure(o){
  this.name = o.name;
  this.loc = {name:o.loc.name, lat: parseFloat(o.loc.lat), lng: parseFloat(o.loc.lng)};
  this.photo = o.photo;
  this.difficulty = o.difficulty;
  this.hint = o.hint;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

Treasure.create = function(o, cb){
  var t = new Treasure (o);
  Treasure.collection.save(t, cb);
};
Treasure.findById= function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:_id},function(err, obj){
    var treasure = changePrototype(obj);
    cb(treasure);
  });
};
module.exports = Treasure;

function changePrototype(obj){
  return _.create(Treasure.prototype, obj);
}
