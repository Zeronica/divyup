Template.checkout.helpers({
	'f_menuItemInCart': function() {
		c = CurrentOrders.findOne({user_id: Meteor.userId()});
		orderItemsArray = OrderItems.find({order_id: c.order_id}).fetch();
		r = [];
		for (i=0; i<orderItemsArray.length; i++) {
			r.push(MenuItems.findOne(orderItemsArray[i].menu_item_id));
		}
		return r;
	},

	'f_total': function() {
		c = CurrentOrders.findOne({user_id: Meteor.userId()});
		return Meteor.myFunctions.totalInOrder(c.order_id);
	}
});

Template.checkout.events({
	'click': function() {
		r = confirm("Checkout cart?");
		if (r) {
			Meteor.call("checkoutCurrentOrder", function(err, result){
				if(err)
					return alert(err.reason);
				alert("succesfully checked out!");
				// temporary code
				Router.go("storeMenu");
			});
		}
	}
})