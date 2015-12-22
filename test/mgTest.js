/**
 * Created by hwen on 15/11/27.
 */

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://localhost:27017/microblog';

var insertDoc = function (db, callback) {
    var collection = db.collection('documents');

    //insert some document
    collection.insertMany([
        {name:'json'},{name:'roger'},{name:'rafa'}
    ],function(err,result){
        assert.equal(err,null);
        assert.equal(3,result.result.n);
        assert.equal(3,result.ops.length);
        console.log("insert 3 documents into the document collection");
        callback(result);
    });

};

var updateDoc = function(db,callback){
    var collection = db.collection('documents');
    collection.updateOne({a:2},{$set:{b:2}},function(err,result){
        assert.equal(err,null);
        assert.equal(1,result.result.n);
        console.log("update the document with the field a equal to 2")
        callback(result);
    });
};

var deleteDoc = function(db,callback){
    var collection = db.collection('documents');

    collection.deleteOne({a:3},function(err,result){
        assert.equal(err,null);
        assert.equal(1,result.result.n);
        console.log("Removed the document with the field a equal to 3");
        callback(result);
    });
};

//var findDoc = function(db,callback){
//    var collection = db.collection('documents');
//    collection.find().toArray(function(err,docs){
//        assert.equal(err,null);
//        assert.equal(2,docs.length);
//        console.log("found the following records");
//        console.dir(docs);
//        callback(docs);
//    });
//};

var findDoc = function(db, callback) {
    var cursor = db.collection('documents').find();
    console.log(cursor);
    //cursor.forEach(function(err, doc) {
    //    assert.equal(err, null);
    //    if(doc != null) {
    //        console.dir(doc);
    //    } else {
    //        callback();
    //    }
    //});
};

MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    findDoc(db,function() {
        db.close();
    });
});