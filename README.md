JQuery Views
=======

Split your HTML into managable views.
Provides the V (View) of the MVC pattern. 

Partial views
------

Traditional javascript MVC frameworks assume that a view corresponds always to a page and therefore rely on complex templating 
systems (templates of view) to capture what is invariant between pages. 
Phrased another way, to render a view these frameworks need to render the whole page which is inefficient.

With jQuery Views there is no need to render a complete page when only a fragment changes 
because a view can be only a fragment of page.

Animations
-----
You can define animated transitions between views.

Responsive composite views
------

Page responsive design is not restricted to the view content:
you can define composite views for larger screens from a set of views that are displayed alone on smaller screens
(with just a few lines of CSS).
