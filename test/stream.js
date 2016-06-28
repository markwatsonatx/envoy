'use strict';
/* globals testUtils */

var assert = require('assert'),
  access = require('../lib/access'),
  utils = require('../lib/utils');

describe('stream processing', function() {

  it('should handle blank lines', function(done) {
    var fs = require('fs');
    var tmp = '/tmp/out.txt';
    var ws = fs.createWriteStream(tmp);
    fs.createReadStream('./test/simulatedchanges.txt',{ encoding: 'utf8'})
      .pipe(utils.liner())
      .pipe(access.authRemover())
      .pipe(ws)
      .on('close', function() {
        var output = fs.readFileSync(tmp, 'utf8');
        // this should parse as JSON
        JSON.parse(output);
        done();

      });
  });
});