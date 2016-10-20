const mapper = require('plucky-mapper').jsonMapper;
const pluckyLoader = require('./plucky-loader');

const {
  getObjectValue,
} = require('./utils');
const path = require('path');
require('./json-require');
require('./yaml-require');
require('./plucky-require');

class ConfigLoader{
  constructor(configFile, mergeWith, {basePath}){
    this.configFile = configFile;
    this.mergeWith = mergeWith;
    this.basePath = basePath;
    this.loadBaseConfig();
    this.config = mapper(this.baseConfig, mergeWith);
  }

  loadBaseConfig(){
    const configFile = this.configFile;
    const basePath = this.basePath;
    const filePath = basePath?path.resolve(basePath, configFile):configFile;
    if(filePath.match(/(^|\/)\.plucky$/i)){
      const mod = {
        exports: {}
      };
      pluckyLoader(mod, filePath);
      return this.baseConfig = mod.exports;
    }
    return this.baseConfig = require(filePath);
  }

  get(path, defaultValue){
    return getObjectValue(path, this.config, defaultValue);
  }
}

module.exports = {
  ConfigLoader,
};
