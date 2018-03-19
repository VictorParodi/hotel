import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import{ Members } from './../api/members/members';

import './body.html';
import './members.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('members.allMembers');
});

Template.members.helpers({
  members() {
    return Members.find();
  }
});