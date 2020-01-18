const fs   = require('fs');

// use 'utf8' to get string instead of byte array  (512 bit key)
var secret  = fs.readFileSync('./config/key', 'utf8');
var publicKEY  = fs.readFileSync('./config/key.pub', 'utf8'); 

module.exports = {secret}