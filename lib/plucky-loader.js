const fs = require('fs');
const nasty = require('nasty-json');
const yaml = require('js-yaml');

module.exports = (module, filename)=>{
  const content = fs.readFileSync(filename, 'utf8');
  try{
    module.exports = nasty.parse(content);
  }catch(e){
    try{
      const f = new Function('module', 'return '+content);
      module.exports = f({exports: {}});
    }catch(e){
      module.exports = yaml.load(content);
    }
  }
};
