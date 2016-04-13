#Overhead
A jQuery plugin to manipulate classes of the body tag to help pin and unpin a scrolling header.

## Usage
Overhead can be initalized as follows: `$.overhead();`

##Options
The following options may be passed as an object to the `$.overhead()` function.  The following are the default options:

    {
	    "offset": 0,
	    "throttle": 150,
	    "directions": true
	    "start_dir": "up",
	    "classes": {
		    "pinned": "overhead-pinned",
		    "unpinned": "overhead-unpinned",
		    "down": "overhead-down",
		    "up": "overhead-up"
		}
    }

 - **offset:** the distance in pixels before the header should be pinned.  Effectively, the breakpoint below which the pinned class will be present on the body tag and above which the unpinned class will be.
 - **throttle:** the time, in milliseconds, to wait before re-executing the behaviors which alter the body tag's classes.  If less than or equal to zero, no throttling will take place.  If not a number, then the default of 150 milliseconds is used.
 - **directions:** if true, then the directional classes will be applied to the body tag.
 - **start_dir:** if `directions` is true, this determines which class is added to the body tag when the page loads.  Must be either `up` or `down`; anything else is ignored.
 - **classes:** this object determines the class names added to the body tag.  One or more of them can be changed.  Any classes beyond those specified in the default object above are ignored.

##Examples

To use overhead such that the offset is the height of the body's header element:

    (function($) {

	    $.overhead({
		    "offset": $("body > header").height()
		});

	})(jQuery);

To use overhead without throttling:

    (function($) {
    
        $.overhead({ "throttle": 0 });
    
    })(jQuery);

To use overhead with an offset and alternate directional classes:

    (function($) {
    
	    $.overhead({
		    "offset": 250,
		    "classes": {
			    "down": "going-down",
			    "up": "going-up"
			}
		});
		
	})(jQuery);

###Changelog:

 1. 2016-04-13: Initial release
