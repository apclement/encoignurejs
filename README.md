JQuery Views
=======

Split your HTML into managable views.
Provides the V (View) of the MVC pattern. 

A View is not a Page
------
A view can be only a fragment of page.
Unlike traditional javascript MVC frameworks that rely on complex templating 
systems (templates of view) to capture what is invariant between pages, there is no need to render a complete page 
when only a fragment changes. 
A direct consequence is that page responsive design is not restricted to the view content:
you can define composite views for larger screens from a set of views that are displayed alone on smaller screens
(with just a few lines of CSS).
