JQuery Views
=======

Split your HTML into managable views.

Provides the V (View) of the MVC pattern. 

View != Page pattern: a view can be only a fragment of page. No need to render a complete page 
when only a fragment is variable unlike traditional javascript MVC frameworks that rely on complex templating 
systems (templates of view) to capture what is invariant between pages.
A direct consequence of this is that page responsive design is not restricted to the view content:
you can define composite views for larger screens from a set of views that are displayed alone on smaller screens
(with just a few lines of CSS).
