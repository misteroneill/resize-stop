resizestop is licensed under the [MIT License](http://opensource.org/licenses/MIT).

Emulating a "resizestop" Event
==============================

window.resizeStop emulates a "resizestop" event on the window object.

This is useful for performing actions that depend on the window size, but are expensive in one way or another - i.e. heavy DOM manipulation or asset loading that might be detrimental to performance if run as often as resize events can fire.

The library-agnostic version assumes the best-case - full support for a number of methods that older or non-DOM-compliant browsers may not support.

Support for the following is assumed:

* `Date.now()`
* `Array.prototype.indexOf()`
* `window.addEventListener()`

You may need to tweak this to work cross-browser or with your library or existing application.

## The jQuery Version of window.resizeStop

This creates a jQuery special event called "resizestop". This event fires after a certain number of milliseconds since the last resize event fired.

Additionally, as part of the event data that gets passed to the eventual handler function, the resizestop special event passes the size of the window in an object called "size".

For example:

    $(window).bind('resizestop', function (e) {
        console.log(e.data.size);
    });
