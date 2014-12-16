define([
    'backbone',
    'models/ship'
], function( Backbone, Ship) {
	
	var WIDTH_CELL = 40,
		HEIGHT_CELL = 40,
		i = 0;
	
	var Collection = Backbone.Collection.extend({
	
        model: Ship	
		
    });

	var ships = new Collection([
		{_id:0,x:500,y:10, w:4*WIDTH_CELL, h:HEIGHT_CELL, offsetX:0, offsetY:0,orientation:"horizon"},
		{_id:1,x:500,y:60, w:3*WIDTH_CELL, h:HEIGHT_CELL, offsetX:0, offsetY:0,orientation:"horizon"},
		{_id:2,x:630,y:60, w:3*WIDTH_CELL, h:HEIGHT_CELL, offsetX:0, offsetY:0,orientation:"horizon"},  
		{_id:3,x:500,y:110, w:2*WIDTH_CELL, h:HEIGHT_CELL, offsetX:0, offsetY:0,orientation:"horizon"},  
		{_id:4,x:590,y:110, w:2*WIDTH_CELL, h:HEIGHT_CELL, offsetX:0, offsetY:0,orientation:"horizon"},
		{_id:5,x:680,y:110, w:2*WIDTH_CELL, h:HEIGHT_CELL, offsetX:0, offsetY:0,orientation:"horizon"}, 
		{_id:6,x:500,y:160, w:WIDTH_CELL, h:HEIGHT_CELL, offsetX:0, offsetY:0,orientation:"horizon"},
		{_id:7,x:550,y:160, w:WIDTH_CELL, h:HEIGHT_CELL, offsetX:0, offsetY:0,orientation:"horizon"},  
		{_id:8,x:600,y:160, w:WIDTH_CELL, h:HEIGHT_CELL, offsetX:0, offsetY:0,orientation:"horizon"},
		{_id:9,x:650,y:160, w:WIDTH_CELL, h:HEIGHT_CELL, offsetX:0, offsetY:0,orientation:"horizon"}
	]);
	
	
    return ships;
});