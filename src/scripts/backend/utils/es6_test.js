
// ensure we are on a system that supports ES6
class testClass {
  constructor(){
    this.val = -1
  }
  
  /**
   * This is a place for a general function description
   * 
   * @param  {any} someParam  This parameter is an example 
   *                          of how a parameter should be documented
   *                          This is also where type can be documented
   * 
   * @return {int}            returns a value associated with the class
   */
  getValue(someParam){
    return this.val
  }
    
}

var classInstance = new testClass()

if( classInstance.getValue() !== -1){
  throw 'es6 not supported : cannot run application'
} else {
  console.log('es6 supported')
}

module.exports = {}