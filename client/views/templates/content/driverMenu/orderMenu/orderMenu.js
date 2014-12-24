Template.orderMenu.helpers({
	'f_orders': function(){
		driver_id = Drivers.findOne({user_id: Meteor.userId()})._id;
		return Divys.find({driver_id: driver_id});
	}
});