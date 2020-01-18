const fs   = require('fs');

// use 'utf8' to get string instead of byte array  (512 bit key)
var secret  = fs.readFileSync('./key', 'utf8');
var publicKEY  = fs.readFileSync('./key.pub', 'utf8'); 

module.exports = {publicKEY}