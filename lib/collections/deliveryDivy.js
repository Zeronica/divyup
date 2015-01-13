DeliveryDivys = new Meteor.Collection('deliveryDivys');
/*
divy_id
deliver_time
*/

Meteor.methods ({
	'setDeliveryDivy': function(data) {
		return setDeliveryDivy(data);
	}
});

var setDeliveryDivy = function(data) {
	if (!data.store_id && !data.user_id && data.user_id != Meteor.userId())
		throw new Meteor.Error(422, 'please provide store_id and user_id.');

		// earliest delivery time
		d = DeliveryDivys.find({sort: {'deliver_time': 1}, limit:1});

		// no deliverydivys exist
		if (d.count() === 0) {
			// potential issue with different days
			deliver_time = Math.max(
				(new Date).getHours(),
				Stores.findOne(data.store_id).delivery_start
			)
			divy_id = Meteor.call('setNewDivy', {store_id: data.store_id});

			// so others may also access this divy
			DeliveryDivys.insert({divy_id: divy_id, deliver_time: deliver_time});
			return divy_id;
		}
		return d.fetch()[0].divy_id;
}