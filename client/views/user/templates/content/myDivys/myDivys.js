Template.myDivys.helpers({
	'f_processingDivys': function(){
		return ProcessingDivys.find({user_id: Meteor.userId()});
	}
});

Template.divyItem.helpers({
	'store': function(){
		p = ProcessingDivys.findOne({user_id: Meteor.userId()});
		return Divys.findOne().store_id;
	}
});