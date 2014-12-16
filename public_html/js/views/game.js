define([
    'backbone',
    'tmpl/game',
	'views/buildField',
	'views/gameField',
	'collections/yourField' 
], function(Backbone, tmpl, build, game, field){


    var View = Backbone.View.extend({

		template: tmpl,
        className: 'wrap',
		collection: field,
		
		events: {
			"click button.fieldBattle__ready": "ready" 
		},
		
        initialize: function () {
			$('body').append(this.el);
			this.render_build();			
        },
		
		ready: function() {
			this.render_game();
		},
		
        render_build: function () {
            this.$el.html(this.template);
			this.$el.find(".fieldBattle__myField").append(build.render());
			return this;
        },
		
		render_game: function () {
            this.$el.html(this.template);
			this.$el.find(".fieldBattle__myField").append(game.render());
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

    return new View();
});