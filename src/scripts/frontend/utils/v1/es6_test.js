// ensure we are on a system that supports ES6

define(function(){
   
  return class TestClass {
    constructor(){
      this.val = -1
    }
    
    getValue(){
      return this.val
    }
      
  }

})
