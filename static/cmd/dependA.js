define(function(require, exports, module) {
    console.log(123)
    setTimeout(() => {
        let dependB = require('dependB');
        dependB.start()
    }, 3000);

    let dependC = require('dependC');
    dependC.start()
})