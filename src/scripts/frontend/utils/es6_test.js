// ensure we are on a system that supports ES6

class testClass {
  constructor(){
    this.val = -1
  }
  
  getValue(){
    return this.val
  }
    
}

var classInstance = new testClass()

if( classInstance.getValue() !== -1){
  throw 'es6 not supported : cannot run application'
} else {
  console.log('es6 supported')
}
