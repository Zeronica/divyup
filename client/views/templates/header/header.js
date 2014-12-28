Template.header.events({
	'click [name=menuToggle]': function(e) {
		e.preventDefault();
        $("#wrapper").toggleClass("toggled");
	}
});