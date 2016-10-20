const pluckyLoader = require('./plucky-loader');

require.extensions['.plucky'] = pluckyLoader;
