(function () {
    var nextTick = typeof process !== 'undefined' && process.nextTick ?
                    process.nextTick.bind(null) :
                    setTimeout.bind(null);

    var ifthen = {
        if_: function (condition) {
            var branchCallback, finalCallback;
            var thenSpecified = false;
            nextTick(function () {
                if (finalCallback) {
                    finalCallback();
                }
            }, 0);

            return {
                then_: function (callback) {
                    thenSpecified = true;
                    if (condition) {
                        branchCallback = callback;
                    }

                    return this;
                },

                else_: function (callback) {
                    if (! thenSpecified) {
                        throw new Error('else_ specified with no then_');
                    }
                    if (! condition) {
                        branchCallback = callback;
                    }

                    return this;
                },

                finally_: function (callback) {
                    if (branchCallback) {
                        finalCallback = function () {
                            branchCallback(callback);
                        };
                    } else {
                        finalCallback = callback;
                    }
                }
            };
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ifthen;
    } else {
        window.ifthen = ifthen;
    }
})();
