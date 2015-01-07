Template.checkoutMenu.helpers({
	'OrderItems': function() {
		return OrderItems.find({order_id: this._id});
	}
	
});

Template.checkoutMenu.events({

	// var totalprice = 0;

	// OrderItems.find({order_id: this._id}).map(function(doc) {
 //  	total += doc.price; });

});