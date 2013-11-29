EncoignureJS
=======

EncoignureJS is a JavaScript web micro-framework based on JQuery that takes the complete counterpart to all the fashionable JavaScript MVC frameworks that are very popular nowadays. It acknowledges the fact that HTML is already MVC and therefore doesn't try to implement another heavy weighted MVC abstraction on top of it. 
EncoignureJS just provides the strict minimum set of concepts that really lack to HTML. That is:
- Views: the need of HTML modularization
- HTML Templating
- Data binding
- URL Routing

Instead of providing all these concepts into one big and very instrusive abstraction, it prefers to integrate with third parties libraries or JQuery plugins that have proven their excellence and efficiency.

View container
----
Split your HTML page into multiple views managed by a view container.
The view container provides:
- Lazy downloading of views
- Animated transitions between views
- Possibility to nest containers recursively and activate them at specific responsive design thresholds with CSS media queries.

HTML Templating
----
EncoignureJS integrates with the excellent WeldJS library for templating and.

Live data binding 
----
EncoignureJS integrates with the amzing WatchJS for live data binding.
 
URL routing
----
Application control states can be associated to a specific URL. For that purpose, EncoignureJS integrates with the JQuery.route plugin.
