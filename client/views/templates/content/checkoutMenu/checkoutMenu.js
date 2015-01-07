Template.checkoutMenu.helpers({
	'OrderItems': function() {
		return OrderItems.find({order_id: this._id});
	}
	
	totalprice: function() {
        var total = 0;
        OrderItems.find({order_id: this._id}).map(function(doc) {
  	total += doc.price});
  	return total;
	},
});
