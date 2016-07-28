module.exports = function(data, callback) {
    if (NODE_ENV === 'development') {
        console.log(`%c ${data}`,'color: green');
        if (callback) {
            callback();
        }
    }
};
