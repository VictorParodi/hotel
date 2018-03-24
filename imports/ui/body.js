import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import{ Members } from './../api/members/members';
import{ Rooms } from './../api/rooms/rooms';

import './body.html';
import './members.html';
import './rooms.html';

window.Members = Members;

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('members.allMembers');
  Meteor.subscribe('rooms.allRooms');
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MMM Do YYYY');
});

Template.members.helpers({
  members() {
    return Members.find();
  }
});

Template.rooms.helpers({
  rooms() {
    return Rooms.find();
  }
});

Template.members.onRendered(function() {
  $('#modal1').modal();
});