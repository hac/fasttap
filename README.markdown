Introducing fasttap
----------------------

Fasttap is intended to be used as a replacement for onclick handlers in an HTML-based app that for mobile browsers. It circumvents the delay added by a mobile browser when using onclick.

It is superior to similar implementations in that it:

* allows the user to scroll by dragging a clickable element
* can allow (or not allow) for DOM propogation
* avoids ghost taps

Usage
------------

element.fasttap(callback);

See example.html for example code.

Feedback and Bugs
-----------------

Email hac@hactheplanet.com.