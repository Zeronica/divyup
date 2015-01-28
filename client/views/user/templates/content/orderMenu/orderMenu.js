Template.orderMenu.helpers({
	'f_orders': function() {
		return Orders.find({user_id: Meteor.userId()});
	},

	'f_totalInOrder': function() {
		m = Meteor.myFunctions.totalInOrder({order_id: this._id});
		console.log(m);
		return m;
	}
})