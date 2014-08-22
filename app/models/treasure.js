'use strict';
var Mongo = require('mongodb'),
    fs = require('fs'),
    path = require('path'),
    _     = require('lodash');


function Treasure(o, p){
  console.log('P:',p);
  this.tname = p.tname[0];
  this.loc = {name:p.name[0], lat: parseFloat(p.lat[0]), lng: parseFloat(p.lng[0])};
  this.photo = o.photo || [];
  this.difficulty = p.difficulty[0];
  this.hint = p.hint[0];
  this.found = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

Treasure.prototype.save = function(cb){
  var treasure = this;
  Treasure.collection.save(this, function(){
    cb(treasure);
  });
};

Treasure.create = function(fields, files, cb){
  //console.log('fields:',fields);
 // console.log('files:',files);
  var t = new Treasure (files, fields);
  console.log('T:',t);
  t.save(t, function(t){
    t.uploadPhoto(files,cb);

  });
};
Treasure.findById= function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:_id},function(err, obj){
    var treasure = changePrototype(obj);
    cb(treasure);
  });
};

Treasure.prototype.uploadPhoto = function(files, cb){
  var dir = __dirname + '/../static/img/' + this._id,
      ext = path.extname(files.photo[0].path),
      abs = dir + '/' + this.tname + ext;
  fs.mkdirSync(dir);
  fs.renameSync(files.photo[0].path, abs);
  this.image = abs;
  Treasure.collection.save(this, cb);
};

Treasure.prototype.found = function(){
  this.found = true;
};
module.exports = Treasure;

function changePrototype(obj){
  return _.create(Treasure.prototype, obj);
}
