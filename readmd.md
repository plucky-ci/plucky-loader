Plucky Loader
===

Used to load configuration files for Plucky.  Supports references for things like global property definitions.

Install
---

```shell
npm install --save plucky-loader
```

API
---

###ConfigLoader.constructor(configFile, mergeWith, {basePath})

Creates an instance of the configuration store from a configuration file, then merges whatever is loaded with mergeWith.

####Parameters

 * configFile - Name of the file to load
 * mergeWith - Object to merge or lookup values from
 * basePath - The base path where the configuration file resides

###ConfigLoader.get(path, defaultValue)

Used to get a configuration value from the store.  If no value is found then defaultValue is returned.

####Parameters

 * path - Dot notation path to the value to retrieve
 * defaultValue - Value to return if the value does not exist

Example
---

Assuming that you have a file called test.yaml in the current working directory with the following:

```yaml
wootCopy: ${woot}
```

And source code that looks something like:

```javascript
const {
  ConfigLoader
} = require('plucky-loader');

const configLocation = 'test.yaml'
const baseConfig = {woot: 'value'};
const options = {baseDir: process.cwd()};
const config = new ConfigLoader(configLocation, baseConfig, options);

console.log(config.get('wootCopy')); // -> value
```
