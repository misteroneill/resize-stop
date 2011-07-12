/**

    A jQuery version of window.resizeStop.

    This creates a jQuery special event called "resizestop". This event fires
    after a certain number of milliseconds since the last resize event fired.

    Additionally, as part of the event data that gets passed to the eventual
    handler function, the resizestop special event passes the size of the 
    window in an object called "size".

    For example:

    $(window).bind('resizestop', function (e) {
        console.log(e.data.size);
    });

    The resizestop special event is useful for performing actions that depend 
    on the window size, but are expensive in one way or another - i.e. heavy 
    DOM manipulation or asset loading that might be detrimental to performance 
    if run as often as resize events can fire.

    @name jQuery.event.special.resizestop
    @requires jQuery 1.4.2
    @namespace

*/
(function ($, setTimeout) {

    var $window = $(window),
        last = 0,
        timer = 0;

    /**
        Handles window resize events.
    */
    function onWindowResize() {
        last = $.now();
        timer = timer || setTimeout(checkTime, 10);
    }

    /**
        Checks if the last window resize was over 500ms ago. If so, executes
        all the functions in the cache.

        @private
    */
    function checkTime() {
        var now = $.now();
        if (now - last < $.resizestop.threshold) {
            timer = setTimeout(checkTime, 10);
        } else {
            clearTimeout(timer);
            timer = last = 0;
            $window.trigger('resizestop');
        }
    }

    $.resizestop = {
        threshold: 500
    };

    $.event.special.resizestop = {
        setup: function (data, namespaces) {
            $window.bind('resize', onWindowResize);
        },
        teardown: function (namespaces) {
            $window.unbind('resize', onWindowResize);
        },
        add: function (handle) {
            var oldHandler = handle.handler;
            handle.handler = function (e) {
                e.data = e.data || {};
                e.data.size = {
                    width: $window.width(),
                    height: $window.height()
                };
                return oldHandler.apply(this, arguments);
            };
        }
    };

})(jQuery, setTimeout);