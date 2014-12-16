define([
    'backbone',
	'models/field',
	'models/ship',
	'collections/fields',
	'collections/enemyFields',
	'collections/ships'	
], function(Backbone, mini_field, ship, Fields, EnemyFields, Ships){

	var i = 0, j;
	var n = 100;
	var n_x = 10;
	var n_ships = 10;
	var width_field = 40;
	var height_field = 40;
	var mouseX, mouseY;
	var cur_ship = new ship;

    var View = Backbone.View.extend({

		tagName: 'canvas',
		events: {
			'mousedown' : 'mouseDown',
			'mousemove' : 'mouseMove',
			'mouseup' : 'mouseUp'
			//'keydown' : 'keyDown'
		},
		
        initialize: function () {
			this.el.width = 1200;
            this.el.height = 600;
			this.el.id = "drawing";
			this.ctx = this.el.getContext('2d');
            //$(document).on('keydown', this.keyDown);
		
        },
		
        render: function () {
			EnemyFields.create();
			this.draw();
			
			return this.el;
        },
		
		draw: function() {
			for (i = 0; i < n; i++) 
				if (Fields.get(i).get("status") == 0)
					Fields.get(i).draw(this.ctx);
			for (i = 0; i < n; i++) 
				if (Fields.get(i).get("status") != 0)
					Fields.get(i).draw(this.ctx);
					
			for (i = 0; i < n; i++) 
				if (EnemyFields.get(i).get("status") == 0)
					EnemyFields.get(i).draw(this.ctx);
		},
		
		mouseDown: function(evt) {
			mouseX = evt.pageX - this.el.offsetLeft;
			mouseY = evt.pageY - this.el.offsetTop;
			for (i = 0; i < n; i++) {
				if (mouseX > EnemyFields.get(i).get("x") && 
						mouseX < EnemyFields.get(i).get("x") + width_field &&							
						mouseY > EnemyFields.get(i).get("y") && 
						mouseY < EnemyFields.get(i).get("y") + height_field) {
					EnemyFields.get(i).set("value", "miss");
				}
			}
		},
		
		mouseUp: function (evt) {
			this.draw();
		}
			
		
	});

    return new View();
});