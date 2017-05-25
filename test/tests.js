'use strict';

describe("addition", function() {
  it("Should add 1 + 1 to make 2", function(d) {
    var onePlusOne = 1 + 1;
    onePlusOne.should.equal(2);

    d();
  })
})
