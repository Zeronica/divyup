Template.statusMenu.events({
	'click .list-group-item': function(e) {
		console.log("new click");
		$('.active').removeClass('active');
		//console.log($(this));
		$(e.target).addClass('active');
	}
})