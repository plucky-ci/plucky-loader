const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('YAML require', ()=>{
  it('uses yaml to parse yaml files', (done)=>{
    require('../lib/yaml-require');
    const json = require('./requires/yaml.yaml');
    const shouldEqual = { foo: 'bar', bar: 'none', obj: { some: 'value', number: 123 } };
    expect(json).to.equal(shouldEqual);
    done();
  });
});
