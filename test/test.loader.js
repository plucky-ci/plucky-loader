const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const {
  ConfigLoader,
} = require('../');

describe('Loader', ()=>{
  const BASIC = require('./configs/basic.js');
  const REFERENCES = require('./configs/references.json');

  it('loads a basic javascript config file', (done)=>{
    const l = new ConfigLoader('./configs/basic.js', {}, {
      basePath: __dirname
    });
    expect(l.config).to.equal(BASIC);
    done();
  });

  it('loads a basic yaml config file', (done)=>{
    const l = new ConfigLoader('./configs/basic.yaml', {}, {
      basePath: __dirname
    });
    expect(l.config).to.equal(BASIC);
    done();
  });

  it('loads a basic JSON config file', (done)=>{
    const l = new ConfigLoader('./configs/basic.json', {}, {
      basePath: __dirname
    });
    expect(l.config).to.equal(BASIC);
    done();
  });

  it('works with a .plucky file', (done)=>{
    const l = new ConfigLoader('./configs/.plucky', {}, {
      basePath: __dirname
    });
    const shouldEqual = { test: 'value', child: { key: 'value' } };
    expect(l.config).to.equal(shouldEqual);
    done();
  });

  it('gets a top level value', (done)=>{
    const l = new ConfigLoader('./configs/basic.js', {}, {
      basePath: __dirname
    });
    const val = l.get('test');
    expect(val).to.equal(BASIC.test);
    done();
  });

  it('gets a child value', (done)=>{
    const l = new ConfigLoader('./configs/basic.js', {}, {
      basePath: __dirname
    });
    const val = l.get('child.key');
    expect(val).to.be.a.string().and.to.equal(BASIC.child.key);
    done();
  });

  it('mapps references to values for JSON', (done)=>{
    const l = new ConfigLoader('./configs/references.json', {}, {
      basePath: __dirname
    });
    const val = l.get('config.test');
    expect(val).to.be.a.string().and.to.equal(REFERENCES.globals.test);
    const childKey = l.get('config.childKey');
    expect(childKey).to.be.a.string().and.to.equal(REFERENCES.globals.child.key.value);
    const child = l.get('config.child');
    expect(child).to.be.an.object().and.to.equal(REFERENCES.globals.child);
    done();
  });

  it('mapps references to values for YAML', (done)=>{
    const l = new ConfigLoader('./configs/references.json', {}, {
      basePath: __dirname
    });
    const val = l.get('config.test');
    expect(val).to.be.a.string().and.to.equal(REFERENCES.globals.test);
    const childKey = l.get('config.childKey');
    expect(childKey).to.be.a.string().and.to.equal(REFERENCES.globals.child.key.value);
    const child = l.get('config.child');
    expect(child).to.be.an.object().and.to.equal(REFERENCES.globals.child);
    done();
  });

  it('mapps global references to values for JSON', (done)=>{
    const config = {
        globals: {
          test: 'some',
          child: {
            key: {
              value: 'more'
            }
          }
        },
      };
    const l = new ConfigLoader('./configs/references.json', config, {
      basePath: __dirname
    });
    const val = l.get('config.test');
    expect(val).to.be.a.string().and.to.equal(config.globals.test);
    const childKey = l.get('config.childKey');
    expect(childKey).to.be.a.string().and.to.equal(config.globals.child.key.value);
    const child = l.get('config.child');
    expect(child).to.be.an.object().and.to.equal(config.globals.child);
    done();
  });

  it('mapps global references to values for YAML', (done)=>{
    const config = {
        globals: {
          test: 'some',
          child: {
            key: {
              value: 'more'
            }
          }
        },
      };
    const l = new ConfigLoader('./configs/references.yaml', config, {
      basePath: __dirname
    });
    const val = l.get('config.test');
    expect(val).to.be.a.string().and.to.equal(config.globals.test);
    const childKey = l.get('config.childKey');
    expect(childKey).to.be.a.string().and.to.equal(config.globals.child.key.value);
    const child = l.get('config.child');
    expect(child).to.be.an.object().and.to.equal(config.globals.child);
    done();
  });
});
