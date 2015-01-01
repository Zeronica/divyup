// timer
Meteor.startup(function() {

   Session.set('serverTime', false);
   // get serverTime on startup
   Meteor.setServerTime();
   // update serverTime every 15min
   Meteor.setInterval(function() { Meteor.setServerTime(); }, 900000);
});

Meteor.setServerTime = function() {
  //get server time (it's in milliseconds)
	Meteor.call("getServerTime", function (error, serverTime) {
	  Session.set('serverTime', serverTime);
	  Session.set('timeObtained', Date.now()); //local time when you got the serverTime
	});
};

Meteor.realServerTime = function() {
  return Session.get('serverTime') + (Date.now() - Session.get('timeObtained'));
}