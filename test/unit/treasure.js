/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure    = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'treasure-map';

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure object', function(){
      var f = {name:'food', loc:{name:'kitchen', lat:'36', lng:'-86.7'}, photo:'yum.com', hint:'open fridge. Eat', found:false},
          t = new Treasure(f);
      expect(t).to.be.instanceof(Treasure);
    });
  });

  describe('.all', function(){
    it('should get all treasures', function(done){
      Treasure.all(function(err, treasures){
        expect(treasures).to.have.length(2);
        done();
      });
    });
  });
});

describe('.create', function(){
  it('should create a new treasure in the database', function(done){
    var f = {name:'food', loc:{name:'kitchen', lat:'36', lng:'-86.7'}, photo:'yum.com', difficulty:'easy', hint:'open fridge. Eat', found:false};
    Treasure.create(f, function(err, treasure){
      expect(treasure._id). to.be.instanceof(Mongo.ObjectID);
      done();
    });
  });
});

describe('.findById', function(){
  it('should find one treasure object out of the database', function(done){
    Treasure.findById('000000000000000000000001',function(treasure){
      console.log(treasure);
      expect(treasure.name).to.equal('Gold');
      expect(treasure.loc.name).to.equal('paris');
      expect(treasure.difficulty).to.equal('hard');
      done();
    });
  });
});
