Template.layout.events({
	'click #menu-toggle': function(e) {
		e.preventDefault();
        $("#wrapper").toggleClass("toggled");
	}
});