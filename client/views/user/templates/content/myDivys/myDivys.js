Template.myDivys.events({
	'click [name=commitDivy]': function(e) {
		e.preventDefault();
		Router.go('divyPage',{_id: this._id});
	}
});

Template.myDivys.helpers({
	'f_divyOrders': function() {
		orderid = Orders.find({user_id: Meteor.userId()}).order_id;
		return DivyOrders.find({order_id: orderid});
	},

	// 'f_departTime': function() {
	// 	time = DeliveryWindows.findOne({_id: this._id}).depart_time;
	// 	hour = ~~(time/100);
	// 	minutes = time % 100;
	// 	return hour + ":" + minutes;
	// }, 

	// 'f_arrivalTime': function() {
	// 	time = DeliveryWindows.findOne({_id: this._id}).arrival_time;
	// 	hour = ~~(time/100);
	// 	minutes = time % 100;
	// 	return hour + ":" + minutes;
	// },

	store: function() {
		return Orders.findOne({user_id: Meteor.userId()}).store_id;
	},
		
	commentsCount: function() {
    	return Comments.find({divyId: this._id}).count();
    },

  	total: function() {
		return Divys.findOne({_id: this.divy_id}).total;
	},

	quota: function() {
		return Divys.findOne({_id: this.divy_id}).quota;
	}
})