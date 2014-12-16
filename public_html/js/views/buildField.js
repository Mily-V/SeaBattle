define([
    'backbone',
	'models/cell',
	'models/ship',
	'collections/yourField',
	'collections/ships'	
], function(Backbone, Cell, Ship, field, ships){

	var WIDTH_CANVAS = 1200,
		HEIGHT_CANVAS = 600,
		WIDTH_CELL = 40,
		HEIGHT_CELL = 40,
		CELL_NUMBER = 100,
		CELL_IN_LINE = 10,
		SHIP_NUMBER = 1,
		DRAG_DIFFER = 8,
		ENTER_KEY = 13,
		UP_KEY = 38,
		RIGHT_KEY = 39,
		i = 0,
		j = 0,
		widthShip = WIDTH_CELL,
		heightShip = HEIGHT_CELL,
		mouseX = 0,
		mouseY = 0,
		drag = false,
		currentShip = new Ship,
		newShipX = 0,
		newShipY = 0;
		//place = [];

    var View = Backbone.View.extend({

		tagName: 'canvas',
		events: {
			'mousedown' : 'mouseDown',
			'mousemove' : 'mouseMove',
			'mouseup' : 'mouseUp'
		},
		
        initialize: function () {
			this.el.width = WIDTH_CANVAS;
            this.el.height = HEIGHT_CANVAS;
			this.el.id = "drawing";
			this.ctx = this.el.getContext('2d');
			_.bindAll(this, 'keyDown');
            $(document).on('keydown', this.keyDown);		
        },
		
        render: function () {
			field.create();
			this.draw();			
			this.start();
			return this.el;
        },
		
		start: function() {
			for (i = 0; i < SHIP_NUMBER ; i++) {
				currentShip = ships.get(i);
				newShipX = currentShip.get("x");
				newShipY = currentShip.get("y");
				currentShip.draw(this.ctx);			
			}				
		},
		
		draw: function() {
			this.ctx.fillStyle = "#FCE45C";
			this.ctx.fillRect(0, 0, this.el.width, this.el.height);	
			for (i = 0; i < CELL_NUMBER; i++) 
				if (field.get(i).get("status") == "empty")
					field.get(i).draw(this.ctx);
			for (i = 0; i < CELL_NUMBER; i++) 
				if (field.get(i).get("status") != "empty")
					field.get(i).draw(this.ctx);
			currentShip.draw(this.ctx);			
		},
		
		mouseDown: function(evt) {
			mouseX = evt.pageX - this.el.offsetLeft;
			mouseY = evt.pageY - this.el.offsetTop;
				if (
					mouseX < currentShip.get("x") + currentShip.get("w") && 
					mouseX > currentShip.get("x") && 
					mouseY < currentShip.get("y") + currentShip.get("h") && 
					mouseY > currentShip.get("y") 
				) {
					drag = true;
					currentShip.set("offsetX", mouseX - currentShip.get("x") + DRAG_DIFFER);
					currentShip.set("offsetY", mouseY - currentShip.get("y") + DRAG_DIFFER);
				}
		},
		
		mouseMove: function(evt) {
			mouseX = evt.pageX - this.el.offsetLeft;
			mouseY = evt.pageY - this.el.offsetTop;
			if (drag) {
				currentShip.set("x", mouseX - currentShip.get("offsetX"));
				currentShip.set("y", mouseY - currentShip.get("offsetY"));
				this.draw();
				for (i = 0; i < CELL_NUMBER; i++) {
					for (j = 0; j < CELL_NUMBER; j++) {
						field.get(j).set("status", "empty");
					}
					if (
						currentShip.get("x") >= field.get(i).get("x") && 
						currentShip.get("x") <= field.get(i).get("x")  + WIDTH_CELL &&							
						currentShip.get("y") >= field.get(i).get("y") && 
						currentShip.get("y") <= field.get(i).get("y") + HEIGHT_CELL
					) {							
						if (currentShip.get("orientation") == "horizon") 
							this.changeColorH(i);
						else 
							this.changeColorV(i);	
						break;
					}
				}
			}
		},
		
		mouseUp: function(evt) {
			console.log("Мышь отпустили");
			drag = false;
			currentShip.set("x", newShipX);
			currentShip.set("y", newShipY);	
			this.draw();
		},
		
		keyDown: function(evt) {
			switch (event.keyCode) {
				case ENTER_KEY:
					for (i = 0; i < CELL_NUMBER; i++)
						if (field.get(i).get("status") == "ok")
							field.get(i).set("value", "busy");
					for (j = 0; j < CELL_NUMBER; j++) {
						field.get(j).set("status", "empty");
					}
					break; 
				case UP_KEY:
					if (currentShip.get("orientation") == "horizon") {
						currentShip.set("orientation", "vertical");
						currentShip.turn();
					}	
					break;    
				case RIGHT_KEY:
					if (currentShip.get("orientation") == "vertical") {
						currentShip.set("orientation", "horizon");
						currentShip.turn();
					}
					break;
			};
			this.draw();
		},

		
		changeColorH: function(i) {
			widthShip = currentShip.get("w") / WIDTH_CELL;	
			console.log(widthShip);
			if (
				currentShip.get("x") >= field.get(i).get("x") && 
				currentShip.get("x") <= field.get(i).get("x") + WIDTH_CELL/2 && 
				currentShip.get("y") >= field.get(i).get("y") && 
				currentShip.get("y") <= field.get(i).get("y") + HEIGHT_CELL/2
			) {
				newShipX = field.get(i).get("x");
				newShipY = field.get(i).get("y");
				for (j = 0; j < widthShip; j++) {
					field.get(i).set("status", "ok");
					i++;
				}
			}
			if (
				currentShip.get("x") >= field.get(i).get("x") + WIDTH_CELL/2 && 
				currentShip.get("x") <= fields.get(i).get("x") + WIDTH_CELL && 
				currentShip.get("y") >= fields.get(i).get("y") && 
				currentShip.get("y") <= field.get(i).get("y") + HEIGHT_CELL/2
			) {
				newShipX = field.get(i+1).get("x");
				newShipY = field.get(i+1).get("y");
				for (j = 0; j < widthShip; j++) {
					field.get(i+1).set("status", "ok");
					i++;
				}
			}
			if (
				currentShip.get("x") >= field.get(i).get("x") && 
				currentShip.get("x") <= field.get(i).get("x") + WIDTH_CELL/2 && 
				currentShip.get("y") >= field.get(i).get("y") + HEIGHT_CELL/2 && 
				currentShip.get("y") <= field.get(i).get("y") + HEIGHT_CELL
			) {
				newShipX = field.get(i+CELL_IN_LINE).get("x");
				newShipY = field.get(i+CELL_IN_LINE).get("y");
				for (j = 0; j < widthShip; j++) {
					field.get(i+CELL_IN_LINE).set("status", "ok");
					i++;
				}
			}
			if (
				currentShip.get("x") >= field.get(i).get("x") + WIDTH_CELL/2 && 
				currentShip.get("x") <= field.get(i).get("x") + WIDTH_CELL && 
				currentShip.get("y") >= field.get(i).get("y") + HEIGHT_CELL/2 && 
				currentShip.get("y") <= field.get(i).get("y") + HEIGHT_CELL
			) {
				newShipX = field.get(i+CELL_IN_LINE+1).get("x");
				newShipY = field.get(i+CELL_IN_LINE+1).get("y");
				for (j = 0; j < widthShip; j++) {
					field.get(i+CELL_IN_LINE+1).set("status", "ok");
					i++;
				}
			}	
		},
		
		changeColorV: function(i) {
			heightShip = currentShip.get("h") / HEIGHT_CELL;		
			if (
				currentShip.get("x") >= field.get(i).get("x") && 
				currentShip.get("x") <= field.get(i).get("x") + WIDTH_CELL/2 && 
				currentShip.get("y") >= field.get(i).get("y") && 
				currentShip.get("y") <= field.get(i).get("y") + HEIGHT_CELL/2
			) {
				newShipX = field.get(i).get("x");
				newShipY = field.get(i).get("y");
				for (j = 0; j < heightShip; j++) {
					field.get(i + CELL_IN_LINE*j).set("status", "ok");
				}
			}
			if (
				currentShip.get("x") >= field.get(i).get("x") + WIDTH_CELL/2 && 
				currentShip.get("x") <= field.get(i).get("x") + WIDTH_CELL && 
				currentShip.get("y") >= field.get(i).get("y") && 
				currentShip.get("y") <= field.get(i).get("y") + HEIGHT_CELL/2
			) {
				newShipX = field.get(i+1).get("x");
				newShipY = field.get(i+1).get("y");
				for (j = 0; j < heightShip; j++) {
					field.get(i + CELL_IN_LINE*j + 1).set("status", "ok");			
				}
			}
			if (
				currentShip.get("x") >= field.get(i).get("x") && 
				currentShip.get("x") <= field.get(i).get("x") + WIDTH_CELL/2 && 
				currentShip.get("y") >= field.get(i).get("y") + HEIGHT_CELL/2 && 
				currentShip.get("y") <= field.get(i).get("y") + HEIGHT_CELL
			) {
				newShipX = field.get(i+CELL_IN_LINE).get("x");
				newShipY = field.get(i+CELL_IN_LINE).get("y");
				for (j = 0; j < heightShip; j++) {
					field.get(i + CELL_IN_LINE*(j + 1)).set("status", "ok");					
				}
			}
			if (
				currentShip.get("x") >= field.get(i).get("x") + WIDTH_CELL/2 && 
				currentShip.get("x") <= field.get(i).get("x") + WIDTH_CELL && 
				currentShip.get("y") >= field.get(i).get("y") + HEIGHT_CELL/2 && 
				currentShip.get("y") <= field.get(i).get("y") + HEIGHT_CELL
			) {
				newShipX = field.get(i+CELL_IN_LINE+1).get("x");
				newShipY = field.get(i+CELL_IN_LINE+1).get("y");
				for (j = 0; j < heightShip; j++) {
					field.get(i + CELL_IN_LINE*(j + 1) + 1).set("status", "ok");			
				}
			}
		}
		
	});

    return new View();
});