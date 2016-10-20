const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Nasty require', ()=>{
  require('../lib/plucky-require');

  it('uses nasty to parse plucky config files that contain json files', (done)=>{
    const json = require('./configs/json.plucky');
    const shouldEqual = { test: 'value', child: { key: 'value' } };
    expect(json).to.equal(shouldEqual);
    done();
  });

  it('uses js-yaml to parse plucky config files that contain yaml files', (done)=>{
    const json = require('./configs/yaml.plucky');
    const shouldEqual = { test: 'value', child: { key: 'value' } };
    expect(json).to.equal(shouldEqual);
    done();
  });

  it('uses Function to parse plucky config files that contain javascript exports', (done)=>{
    const json = require('./configs/js.plucky');
    const shouldEqual = { test: 'value', child: { key: 'value' } };
    expect(json).to.equal(shouldEqual);
    done();
  });
});
