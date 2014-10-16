
define([
    'backbone',
    'tmpl/game'
],
 function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({

		root: $("#page"),
		template: tmpl,
		initialize : function() {
			$(this.root).append(this.el);
			this.render();
		},

		render : function() {
			this.$el.html(this.template);
		}, 

		show : function() {
			this.$el.show();
			this.trigger("show", this);
		},

		hide : function() {
			this.$el.hide();
		}
	});

    return new View();
});