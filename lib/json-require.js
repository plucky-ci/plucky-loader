const fs = require('fs');
const nasty = require('nasty-json');

require.extensions['.json'] = (module, filename)=>{
  const content = fs.readFileSync(filename, 'utf8');
  module.exports = nasty.parse(content);
};
