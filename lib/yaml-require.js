const fs = require('fs');
const yaml = require('js-yaml');

require.extensions['.yaml'] =
require.extensions['.yml'] = (module, filename)=>{
  const content = fs.readFileSync(filename, 'utf8');
  module.exports = yaml.load(content);
};
