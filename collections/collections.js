// Users = new Meteor.Collection('users'); 

Stores = new Meteor.Collection('stores');
/*
storename
distance // just here temporarily of course
distance_unit
open
*/

Divys = new Meteor.Collection('divys');
/*
store_id
title
quota
total
*/

Orders = new Meteor.Collection('orders');
/*
user_id
store_id
*/


DivyOrders = new Meteor.Collection('divyOrders');
/*
divy_id
order_id
*/

OrderItems = new Meteor.Collection('orderItems');
/*
order_id
menu_item_id
*/

Menus = new Meteor.Collection('menus');
/*
store_id
*/

MenuItems = new Meteor.Collection('menuItems');
/*
menu_id
name
price
*/

Drivers = new Meteor.Collection('drivers');
/*
user_id
delivery_window
*/

Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      divyId: String,
      body: String
    });x
    
    var user = Meteor.user();
    var divy = Divys.findOne(commentAttributes.divyId);

    if (!post)
      throw new Meteor.Error('invalid-comment', 'You must comment on a post');
    
    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    
    // update the post with the number of comments
    Divys.update(comment.divyId, {$inc: {commentsCount: 1}});
    
    return Comments.insert(comment);
  }
});