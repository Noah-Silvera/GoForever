
require = requirejs

requirejs.config({
    baseUrl: '/',
    paths: {
      "request": 'lib/request',
      "utils/es6_test" : 'utils/v1/es6_test'
    },
    shim:{
        'request': {
            exports: ['request']
        }
    }
});