(function($) {
    var previously_scrolled = $(window).scrollTop();

    var throttle = function(callback, limit) {
        if (typeof(callback) !== "function") return;

        // source: https://jsfiddle.net/jonathansampson/m7G64/ (accessed: 2016-04-13)

        var wait = false;
        return function() {
            if (!wait) {

                // if we're not waiting, then we want to call our callback.  because we're
                // calling it, we also want to wait for our limit (in milliseconds) to pass
                // before we call it again.  therefore, we set wait to true.

                callback.call();
                wait = true;

                // now, we set a timeout that will reset the wait flag.  after limit
                // milliseconds, the flag will be reset and subsequent and callback can
                // again be executed.

                setTimeout(function() { wait = false; }, limit);
            }
        };
    };

    $.overhead = function(options) {
        var body = $("body");

        // notice the true-flag passed to the $.extend() function.  this ensures a deep copy
        // of our default options.classes in addition to the rest of the object.

        options  = $.extend(true, {
            "offset":     0,						// distance from top of screen before pinning
            "throttle":   150,						// time in milliseconds to throttle the scrolling behavior
            "directions": true,						// whether or not to include scrolling directions
            "start_dir":  "up",						// the initial direction when the page loads
            "classes": {
                "pinned":   "overhead-pinned",		// class indicating a pinned header (i.e. when it scrolls)
                "unpinned": "overhead-unpinned",	// class indicating an unpinned header
                "down":     "overhead-down",		// class to use when the visitor is scrolling down
                "up":       "overhead-up"			// class to use when the visitor is scrolling up
            }
        }, options);

        // we'll pretty much let people do whatever they want to everything except the throttle
        // option.  if they've set it to something that's not a number, we'll set it back to 150.

        if (isNaN(Number(options.throttle))) {
            options.throttle = 150;
        }

        console.log(options);

        var toggler = function(force_start_dir) {

            // the toggler function determines (a) if we've scrolled past the options.offset
            // distance and (b) if we're scrolling up or down.  the distance we've scrolled
            // determines if which of the pin classes we add to the body tag.  the direction
            // is also added to the body tag.

            var scrolled  = $(window).scrollTop();

            var pin_class_add = scrolled > options.offset ? options.classes.pinned : options.classes.unpinned;
            var pin_class_rem = pin_class_add == options.classes.pinned ? options.classes.unpinned : options.classes.pinned;

            // now that we've discovered the appropriate pin class, we want to add it to the
            // body tag.  but, we also need to be sure that the other pin class is not on it.
            // that's why we've identified by the class to add and the class to remove.  now,
            // we'll do that:

            body.removeClass(pin_class_rem).addClass(pin_class_add);

            if (options.directions === true) {
                var direction = options.classes[options.start_dir];

                if (force_start_dir !== true) {

                    // when the page loads, we want to force the starting direction to be listed
                    // on the body tag.  otherwise, the direction should actually be reflected by
                    // the direction of our scroll.  to determine the direction, we test the
                    // distance we've scrolled this time vs. the last time we executed this
                    // function.  if the previously scrolled distance is less than our currently
                    // scrolled distance, then we're moving down.

                    direction = previously_scrolled < scrolled ? options.classes.down : options.classes.up;
                }

                var direction_rem = direction == options.classes.down ? options.classes.up : options.classes.down;
                body.removeClass(direction_rem).addClass(direction);
            }

            // finally, so that we can identify our direction next time, we save the distance
            // we've scrolled for next time.

            previously_scrolled = scrolled;
        };

        // now, we set our toggler function to occur when the window is scrolled.  however,
        // to avoid doing the above work too regularly, we want to throttle things so that they
        // only happen once every options.throttle milliseconds.  if throttle has been set to
        // anything that's less than or equal to zero, we just skip it entirely.

        var scroller = options.throttle > 0 ? throttle(toggler, options.throttle) : toggler;
        $(window).scroll(scroller);

        // and, so that the appropriate classes will be applied to the body tag when the page
        // is loaded, we'll also execute the toggler now.  we pass in the true flag which will
        // ensure that the specified starting direction for our scroll is used.

        toggler(true);
    };

})(jQuery);