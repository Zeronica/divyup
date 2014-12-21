var itemsInMenu = [
	{
		title: "title1",
		text: "blah blah blah"
	},
	{
		title: "title2",
		text: "blah blah blah"
	},
	{
		title: "title3",
		text: "blah blah blah"
	}
]

Template.menu.helpers({
	'itemsInMenu': function() {
		return itemsInMenu;
	}
})