Template.newDivy.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var divy = {
      title: $(e.target).find('[name=title]').val(),
      store: $(e.target).find('[name=store]').val()
    };
    
      divy._id = Divys.insert(divy);
      Router.go('divyPage', divy);
  }

});

