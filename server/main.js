import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import { hookMethods } from './methods';
import { publishEverything } from './publications';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
  publishEverything()
  hookMethods()

});
