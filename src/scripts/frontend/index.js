


require = requirejs

require(['utils/es6_test','request'],function(TestClass,request){
   
     // test that es6 is supported and requirejs is working
     var test = new TestClass()
     if( !test.getValue() ) throw 'es6 not supported: cannot run app'
     console.log('requirejs loaded and es6 supported')

     console.info('application loaded')


})


