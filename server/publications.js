import { Communities } from "../communities/communities";
import { People } from "../people/people";
import { Registering } from "../registering/registering";

export const publishEverything = () => {

    Meteor.publish('communities', function () {
        return Communities.find({});
    });

    Meteor.publish('peoplePerCommunity', function () {
        return People.find({}, { sort: { firstName: 1 }});
    });

    Meteor.publish('registering', function () {
        return Registering.find({});
    });

}