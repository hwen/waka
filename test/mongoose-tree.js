var Test = require('../api/topic/topic.model');
var log = require('../components/util/log');

var adam = new Test({ name : 'Adam' });
var bob = new Test({ name : 'Bob' });
var carol = new Test({ name : 'Carol' });

// Set the parent relationships
bob.parent = adam;
carol.parent = bob;

adam.save(function() {
    bob.save(function() {
        carol.save();
    });
});


Test.findOne({name:'Adam'}).exec(function(err, adam) {
    adam.getChildren(true, function(err, users) {
        // users is an array with both bob and carol documents
        console.log(users);
        log.out(users);
    });
});
