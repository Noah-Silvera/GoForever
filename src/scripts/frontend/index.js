
requirejs.config({
    paths: {
      "jQuery": 'https://code.jquery.com/jquery-3.0.0.min'
    },
    shim:{
        'jQuery': {
            exports: ['$']
        }
    }
});

require = requirejs

require(['utils/es6_test.js'],function(TestClass){
   
     // test that es6 is supported and requirejs is working
     var test = new TestClass()
     if( !test.getValue() ) throw 'es6 not supported: cannot run app'
     console.log('requirejs loaded and es6 supported')

     console.info('application loaded')


})