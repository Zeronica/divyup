// NOTE: this file is only for collections without meteor methods.
// Users = new Meteor.Collection('users'); 

Stores = new Meteor.Collection('stores');
/*
storename
distance // just here temporarily of course
distance_unit
open
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