define([
	'backbone',
	'tmpl/scoreboard', 
	'collections/scores' 
], function(Backbone, tmpl, Scores) {
	
	var View = Backbone.View.extend({
	
		template: tmpl,
        className: 'wrap',
		
        initialize: function () {
			$('body').append(this.el);
			this.hide();
			this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
			return this;
        },
        show: function () {
            this.$el.show();
			this.trigger("show", this);
        },
        hide: function () {
            this.$el.hide();
        }
		
	});	

    return new View({model: Scores});
});