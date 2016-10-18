const mapper = require('plucky-mapper').jsonMapper;
const {
  getObjectValue,
} = require('./utils');
const path = require('path');
require('./json-require');
require('./yaml-require');

class ConfigLoader{
  constructor(configFile, megeWith, {basePath}){
    this.baseConfig = require(basePath?path.resolve(basePath, configFile):configFile);
    this.config = mapper(this.baseConfig, megeWith);
  }

  get(path, defaultValue){
    return getObjectValue(path, this.config, defaultValue);
  }
}

module.exports = {
  ConfigLoader,
};
