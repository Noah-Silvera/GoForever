


require = requirejs

// in this call, the userController the ONLY component loaded of the MVC
// Due to issues with circular dependencies ( see GameView.js at the bottom )
// is it REQUIRED that a controller be the first / ONLY component loaded of the MVC
require(['utils/es6_test','request','controllers/userController'],function(TestClass,request){
   
     // test that es6 is supported and requirejs is working
     var test = new TestClass()
     if( !test.getValue() ) throw 'es6 not supported: cannot run app'
     console.log('requirejs loaded and es6 supported')

     console.info('application loaded')


})


