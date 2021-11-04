define([
    'dependB'
], function(dependB) {
    console.log('A')
    return {
        start: function() {
            document.write(dependB.name)
        }
    }
});