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
prices
*/