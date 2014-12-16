define([
    'backbone',
    'models/field'
], function( Backbone, Field) {
	
	var width_field = 40;
	var height_field = 40;
	var x0 = 10, y0 = 10;
	var i = 0;
	var n = 100;
	var n_x = 10;
	
	var Collection = Backbone.Collection.extend({
        model: Field,

		
		create: function() {
			for (i = 1; i < n+1; i++) {
				this.add({_id: i-1, x: x0, y: y0, w: width_field, h: height_field, 
						n: i-1, status: 0, block: 0, value: "empty"});
				x0 = x0 + width_field;
				if (i%n_x == 0) {
					y0 = y0 + height_field;
					x0 = 10;
				}
			}					
		}
		
    });

	var Fields = new Collection();
	
    return Fields;
});