Template.home.helpers({
	'f_isDriver': function(){
		return Drivers.findOne({user_id: Meteor.userId()})
	}
})