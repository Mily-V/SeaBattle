define([
    'backbone',
    'models/ship'
], function( Backbone, Ship) {
	
	var width_field = 40;
	var height_field = 40;
	var i = 0;
	
	var Collection = Backbone.Collection.extend({
        model: Ship	
		
    });

	var Ships = new Collection([
		{_id:0,x:500,y:10, w:4*width_field, h:height_field, offsetX:0, offsetY:0,orientation:0},
		{_id:1,x:500,y:60, w:3*width_field, h:height_field, offsetX:0, offsetY:0,orientation:0},
		{_id:2,x:630,y:60, w:3*width_field, h:height_field, offsetX:0, offsetY:0,orientation:0},  
		{_id:3,x:500,y:110, w:2*width_field, h:height_field, offsetX:0, offsetY:0,orientation:0},  
		{_id:4,x:590,y:110, w:2*width_field, h:height_field, offsetX:0, offsetY:0,orientation:0},
		{_id:5,x:680,y:110, w:2*width_field, h:height_field, offsetX:0, offsetY:0,orientation:0}, 
		{_id:6,x:500,y:160, w:width_field, h:height_field, offsetX:0, offsetY:0,orientation:0},
		{_id:7,x:550,y:160, w:width_field, h:height_field, offsetX:0, offsetY:0,orientation:0},  
		{_id:8,x:600,y:160, w:width_field, h:height_field, offsetX:0, offsetY:0,orientation:0},
		{_id:9,x:650,y:160, w:width_field, h:height_field, offsetX:0, offsetY:0,orientation:0}
	]);
	
	
    return Ships;
});