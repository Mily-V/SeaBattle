define([
    'backbone',
], function(Backbone) {
	
    var Model = Backbone.Model.extend({	

		idAttribute: "_id",
		
        default: {
			_id: 0,
            x: 0,
			y: 0,
			w: 0,
			h: 0,
			n: 0,
			status: 0,
			block: 0,
			value: "empty"
        },
		
		draw: function(ctx) {
			ctx.beginPath();
			ctx.rect(this.get("x"), this.get("y"), this.get("w"), this.get("h"));
				
			if (this.get("value") == "empty")
				ctx.fillStyle = "#f9ffd9";
			if (this.get("value") == "miss")
				ctx.fillStyle = "#CDCDB4";
			if (this.get("value") == "busy")
				ctx.fillStyle = "#A2C5BF";
			
			ctx.fill();
			ctx.lineWidth = 2;
			if (this.get("status") == 0)
				ctx.strokeStyle = "black";
			if (this.get("status") == 2)
				ctx.strokeStyle = "green";
			if (this.get("status") == 1)			
				ctx.strokeStyle = "red";
			ctx.stroke();	
		}
		
    });
	
    return Model;
});