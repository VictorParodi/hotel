import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import{ Members } from './../api/members/members';
import{ Rooms } from './../api/rooms/rooms';

import './body.html';
import './members.html';
import './rooms.html';

AutoForm.setDefaultTemplate('materialize');

window.Members = Members;
window.Rooms = Rooms;

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

Template.room.helpers({
  makeUniqueID() {
    return this._id;
  },

  returnName(tenantID) {
    const member = Members.findOne({ _id: tenantID });
    console.log('------------------', member);
    return `${member.firstName} ${member.lastName}`;
  }
});

Template.members.onRendered(function() {
  $('#modal1').modal();
});

Template.rooms.onRendered(function() {
  $('collapsible').collapsible();
});