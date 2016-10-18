const getObjectValue = (key, obj, defaultValue)=>{
  let o = obj;
  let path = key.split('.');
  let segment;
  while(o && path.length){
    segment = path.shift();
    o = o[segment];
  }
  if(typeof(o) !== 'undefined'){
    return o;
  }
  return defaultValue;
};

module.exports = {
  getObjectValue,
}
