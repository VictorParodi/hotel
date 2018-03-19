import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

const Rooms = new Mongo.Collection('rooms');

const RoomSchema = new SimpleSchema({
  roomNumber: { type: Number },
  checkIn: { type: Date },
  checkOut: { type: Date },
  tenantID: { type: String },
  available: { type: Boolean },
  needCleaning: { type: Boolean },
  createdAt: {
    type: Date,
    autoform: {
      type: 'hidden',
      label: false
    },
    defaultValue: new Date()
  }
});

Rooms.attachSchema(RoomSchema);

export default Rooms;