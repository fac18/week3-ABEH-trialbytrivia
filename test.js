var test = require('tape')
var createIncrementer = require('./logic');




test('returns increment number', function(t){
var expected  = 1;
var actual = createIncrementer();
t.deepEqual(actual, expected, "should return 1 ");
  t.end();
});

test('returns increment number', function(t){
    var expected  = 2;
    var actual = createIncrementer();
    t.deepEqual(actual, expected, "should return 2 ");
      t.end();
    });

