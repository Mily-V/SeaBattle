define([
    'backbone',
	'models/field',
	'models/ship',
	'collections/fields',
	'collections/ships'	
], function(Backbone, mini_field, ship, Fields, Ships){

	var i = 0, j;
	var n = 100;
	var n_x = 10;
	var n_ships = 10;
	var width_field = 40;
	var height_field = 40;
	var len, lenY;
	var mouseX, mouseY;
	var drag = false;
	var cur_ship = new ship;
	var interval;
	var place = [];
	var newX, newY;	

    var View = Backbone.View.extend({

		tagName: 'canvas',
		events: {
			'mousedown' : 'mouseDown',
			'mousemove' : 'mouseMove',
			'mouseup' : 'mouseUp'
		},
		
        initialize: function () {
			this.el.width = 1200;
            this.el.height = 600;
			this.el.id = "drawing";
			this.ctx = this.el.getContext('2d');
			_.bindAll(this, 'keyDown');
            $(document).on('keydown', this.keyDown);
		
        },
		
        render: function () {
			Fields.create();
			this.draw();
			
			this.start();
			return this.el;
        },
		
		start: function() {
			for (i = 0; i < 1; i++) {
				console.log("i = " + i);
				cur_ship = Ships.get(i);
				newX = cur_ship.get("x");
				newY = cur_ship.get("y");
				cur_ship.draw(this.ctx);			
			}				
		},
		
		draw: function() {
			this.ctx.fillStyle = "#FCE45C";
			this.ctx.fillRect(0, 0, this.el.width, this.el.height);	
			for (i = 0; i < n; i++) 
				if (Fields.get(i).get("status") == 0)
					Fields.get(i).draw(this.ctx);
			for (i = 0; i < n; i++) 
				if (Fields.get(i).get("status") != 0)
					Fields.get(i).draw(this.ctx);
			cur_ship.draw(this.ctx);
			
		},
		
		mouseDown: function(evt) {
			mouseX = evt.pageX - this.el.offsetLeft;
			mouseY = evt.pageY - this.el.offsetTop;
				if (mouseX < cur_ship.get("x") + cur_ship.get("w") && 
						mouseX > cur_ship.get("x") && 
						mouseY < cur_ship.get("y") + cur_ship.get("h") && 
						mouseY > cur_ship.get("y")) {
					drag = true;
					cur_ship.set("offsetX", mouseX - cur_ship.get("x") + 8);
					cur_ship.set("offsetY", mouseY - cur_ship.get("y") + 8);
				}
		},
		
		mouseMove: function (evt) {
			console.log("мышка удерживается");
			mouseX = evt.pageX - this.el.offsetLeft;
			mouseY = evt.pageY - this.el.offsetTop;
			if (drag) {
				cur_ship.set("x", mouseX - cur_ship.get("offsetX"));
				cur_ship.set("y", mouseY - cur_ship.get("offsetY"));
				this.draw();
				for (i = 0; i < n; i++) {
					for (j = 0; j < n; j++) {
						//if (arr[j].status != 1)
						Fields.get(j).set("status", 0);
					}
					if (cur_ship.get("x") >= Fields.get(i).get("x") && 
							cur_ship.get("x") <= Fields.get(i).get("x")  + width_field &&							
							cur_ship.get("y") >= Fields.get(i).get("y") && 
							cur_ship.get("y") <= Fields.get(i).get("y") + height_field) {
							
						if (cur_ship.get("orientation") == 0) 
							this.changeColorH(i);
						else 
							this.changeColorV(i);	
						break;
					}
				}
			}
		},
		
		mouseUp: function (evt) {
			console.log("Отпустили мышь");
			drag = false;
			cur_ship.set("x", newX);
			cur_ship.set("y", newY);	
			this.draw();
		},
		
		keyDown: function(evt) {
			switch (event.keyCode) {
				case 13:
					for (i = 0; i < n; i++)
						if (Fields.get(i).get("status") == 2)
							Fields.get(i).set("value", "busy");
					for (j = 0; j < n; j++) {
						//if (arr[j].status != 1)
						Fields.get(j).set("status", 0);
					}
					break; 
				case 38:
					if (cur_ship.get("orientation") == 0) {
						cur_ship.set("orientation", 1);
						cur_ship.turn();
						//this.draw();
					}	
					break;    
				case 39:
					if (cur_ship.get("orientation") == 1) {
						cur_ship.set("orientation", 0);
						cur_ship.turn();
						//this.draw();
					}
					break;
			};
			this.draw();
		},

		
		changeColorH: function(i) {
			len = cur_ship.get("w") / width_field - 1;		
			if (cur_ship.get("x") >= Fields.get(i).get("x") && 
					cur_ship.get("x") <= Fields.get(i).get("x") + width_field/2 && 
					cur_ship.get("y") >= Fields.get(i).get("y") && 
					cur_ship.get("y") <= Fields.get(i).get("y") + height_field/2) {
				newX = Fields.get(i).get("x");
				newY = Fields.get(i).get("y");
				for (j = 0; j <= len; j++) {
					Fields.get(i).set("status", 2);
					i++;
				}
			}
			if (cur_ship.get("x") >= Fields.get(i).get("x") + width_field/2 && 
					cur_ship.get("x") <= Fields.get(i).get("x") + width_field && 
					cur_ship.get("y") >= Fields.get(i).get("y") && 
					cur_ship.get("y") <= Fields.get(i).get("y") + height_field/2) {
				newX = Fields.get(i+1).get("x");
				newY = Fields.get(i+1).get("y");
				for (j = 0; j <= len; j++) {
					Fields.get(i+1).set("status", 2);
					i++;
				}
			}
			if (cur_ship.get("x") >= Fields.get(i).get("x") && 
					cur_ship.get("x") <= Fields.get(i).get("x") + width_field/2 && 
					cur_ship.get("y") >= Fields.get(i).get("y") + height_field/2 && 
					cur_ship.get("y") <= Fields.get(i).get("y") + height_field) {
				newX = Fields.get(i+n_x).get("x");
				newY = Fields.get(i+n_x).get("y");
				for (j = 0; j <= len; j++) {
					Fields.get(i+n_x).set("status", 2);
					i++;
				}
			}
			if (cur_ship.get("x") >= Fields.get(i).get("x") + width_field/2 && 
					cur_ship.get("x") <= Fields.get(i).get("x") + width_field && 
					cur_ship.get("y") >= Fields.get(i).get("y") + height_field/2 && 
					cur_ship.get("y") <= Fields.get(i).get("y") + height_field) {
				newX = Fields.get(i+n_x+1).get("x");
				newY = Fields.get(i+n_x+1).get("y");
				for (j = 0; j <= len; j++) {
					Fields.get(i+n_x+1).set("status", 2);
					i++;
				}
			}	
		},
		
		changeColorV: function(i) {
			lenY = cur_ship.get("h") / height_field - 1;		
			if (cur_ship.get("x") >= Fields.get(i).get("x") && 
					cur_ship.get("x") <= Fields.get(i).get("x") + width_field/2 && 
					cur_ship.get("y") >= Fields.get(i).get("y") && 
					cur_ship.get("y") <= Fields.get(i).get("y") + height_field/2) {
				newX = Fields.get(i).get("x");
				newY = Fields.get(i).get("y");
				for (j = 0; j <= lenY; j++) {
					console.log("dim: " + lenY);
					Fields.get(i + n_x*j).set("status", 2);
				}
			}
			if (cur_ship.get("x") >= Fields.get(i).get("x") + width_field/2 && 
					cur_ship.get("x") <= Fields.get(i).get("x") + width_field && 
					cur_ship.get("y") >= Fields.get(i).get("y") && 
					cur_ship.get("y") <= Fields.get(i).get("y") + height_field/2) {
				newX = Fields.get(i+1).get("x");
				newY = Fields.get(i+1).get("y");
				for (j = 0; j <= lenY; j++) {
					Fields.get(i + n_x*j + 1).set("status", 2);			
				}
			}
			if (cur_ship.get("x") >= Fields.get(i).get("x") && 
					cur_ship.get("x") <= Fields.get(i).get("x") + width_field/2 && 
					cur_ship.get("y") >= Fields.get(i).get("y") + height_field/2 && 
					cur_ship.get("y") <= Fields.get(i).get("y") + height_field) {
				newX = Fields.get(i+n_x).get("x");
				newY = Fields.get(i+n_x).get("y");
				for (j = 0; j <= lenY; j++) {
					Fields.get(i + n_x*(j + 1)).set("status", 2);					
				}
			}
			if (cur_ship.get("x") >= Fields.get(i).get("x") + width_field/2 && 
					cur_ship.get("x") <= Fields.get(i).get("x") + width_field && 
					cur_ship.get("y") >= Fields.get(i).get("y") + height_field/2 && 
					cur_ship.get("y") <= Fields.get(i).get("y") + height_field) {
				newX = Fields.get(i+n_x+1).get("x");
				newY = Fields.get(i+n_x+1).get("y");
				for (j = 0; j <= lenY; j++) {
					Fields.get(i + n_x*(j + 1) + 1).set("status", 2);			
				}
			}
		}
		
		
		
		
		
	});

    return new View();
});