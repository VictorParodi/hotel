import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import faker from 'faker';
import { Members } from './../imports/api/members/members';
import { Rooms } from './../imports/api/rooms/rooms';

Meteor.startup(() => {
  // code to run on server at startup

  Meteor.publish('rooms.vacantRooms', () => {
    return Rooms.find({
      available: true
    });
  });

  Meteor.publish('rooms.allRooms', () => {
    return Rooms.find();
  });

  Meteor.publish('members.allMembers', () => {
    return Members.find();
  });

  const numberMembers = Members.find({}).count();
  console.log('MEMBERS', numberMembers);

  const numberRooms = Rooms.find().count();
  console.log('ROOMS', numberRooms);

  if (!numberMembers) {
    _.times(20, () => {
      const firstName      = faker.name.firstName();
      const lastName       = faker.name.lastName();
      const member         = faker.internet.userName();
      const street         = faker.address.streetAddress();
      const city           = faker.address.city();
      const state          = faker.address.state();
      const zip            = faker.address.zipCode();
      const lastCheckout   = faker.date.past();
      const numberOfNights = faker.random.number(40);
      const preferences    = faker.random.words();
      
      let newMember = {
        firstName,
        lastName,
        member,
        street,
        city,
        state,
        zip,
        lastCheckout,
        numberOfNights,
        preferences,
        createdAt: new Date()
      }
    
      Members.insert(newMember);
    });
  }

  if (!numberRooms) {
    _.times(25, (roomNumber) => {
      roomNumber++;
      const checkIn = faker.date.past();
      const checkOut = faker.date.future();

      let newRoom = {
        roomNumber,
        checkIn,
        checkOut,
        tenantID: 'No one',
        available: true,
        needCleaning: true,
        createdAt: new Date()
      }

      Rooms.insert(newRoom);

      return roomNumber;
    });
  }
});
