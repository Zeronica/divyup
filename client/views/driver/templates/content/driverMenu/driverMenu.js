// Template.driverMenu.rendered = function() {
//     if(!this._rendered) {
//       this._rendered = true;
//       checkProcessingDivy();
//     }
// };

Template.driverMenu.helpers({
	'f_processingDivy': function() {
		d = Drivers.findOne({user_id: Meteor.userId()});

		p = ProcessingDivys.findOne({driver_id: d._id});

		if (p) {
			console.log(p);
			Router.go("popUpOrder", {_id: p.divy_id});
		} else {
			console.log("cannot find processing divy");
		}
	}
})


