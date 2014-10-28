define([
	'backbone',
	'jquery',
	'router'
], function (Backbone, jQuery, router) {
	var views = [];

	var View = Backbone.View.extend({
		
		addView: function(currentView) {
			views.push(currentView);
			this.listenTo(currentView, "show", function() {
				views.forEach(function(view) {
					if (view != currentView) {
						view.hide();
					}
				});
			});
		}
		
	});

	return new View();
});