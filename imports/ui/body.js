import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import{ Members } from './../api/members/members';
import{ Rooms } from './../api/rooms/rooms';

import './body.html';
import './members.html';
import './rooms.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('members.allMembers');
  Meteor.subscribe('rooms.allRooms');
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