var test = require('tape')
const functions = require('./logic');





test('returns increment number', function(t){
var expected  = 1;
let createdFunction = functions.createIncrementer();
var actual = createdFunction()
t.deepEqual(actual, expected, "should return 1 ");
  t.end();
});

test('returns increment number', function(t){
    var expected  = 2;
    let createdFunction = functions.createIncrementer();
    createdFunction()
    var actual = createdFunction()
    t.deepEqual(actual, expected, "should return 2 ");
      t.end();
    });

    test('returns increment number', function(t){
      var expected  = 3;
      let createdFunction = functions.createIncrementer();
      createdFunction();
      createdFunction();
      var actual = createdFunction()
      t.deepEqual(actual, expected, "should return 3 ");
        t.end();
      });

//     test('returns random ' , function(t){

//  var expected = 
    
// });

