const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Nasty require', ()=>{
  it('uses nasty to parse json files', (done)=>{
    require('../lib/json-require');
    const json = require('./requires/nasty.json');
    const shouldEqual = { foo: 'bar', bar: 'none', obj: { some: 'value', number: 123 } };
    expect(json).to.equal(shouldEqual);
    done();
  });
});
