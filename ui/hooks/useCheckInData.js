import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { Communities } from "../../communities/communities";
import { People } from "../../people/people";
import { Registering } from "../../registering/registering";

export const useCheckInData = (selectedCommunity) => {

    const isLoadingCommunities = useSubscribe('communities')
    const communities = useFind(() => Communities.find(), []);

    const isLoadingPeople = useSubscribe('peoplePerCommunity')
    const people = useFind(() => selectedCommunity && People.find({ communityId: selectedCommunity}) || [], [selectedCommunity]);

    const isLoadingRegistering = useSubscribe('registering')
    const registering = useFind(() => Registering.find({ "person.communityId": selectedCommunity }), [selectedCommunity]);

    const isLoadingData = isLoadingCommunities() && isLoadingPeople() && isLoadingRegistering()

    // update an existing check-in
    const handleCheckOut = (personId) => {
        Meteor.call('updateRegistering', personId, { 
            checkOutDate: new Date()
        })
    }

    // insert or update an existing check-in depending on the record status.
    const handleCheckIn = (personId) => {
    
        // find open check-in
        const record = registering.find(record => record.person._id == personId)
        if (record) {
    
          if (!record.checkOutDate) {
            return
          }
    
          // update
          Meteor.call('updateRegistering', personId, { 
            checkInDate: new Date(),
            checkOutDate: null
          })
    
          return
        }
    
        // insert a new check-in
        const person = people.find(person => person._id == personId)
        Meteor.call('insertRegistering', { 
          person, 
          checkInDate: new Date()
        })
    
    }

    const definePersonStatus = (people) => {
        return people.map(person => {
            const record = registering.find(record => record.person._id == person._id)
            return {
                ...person,
                checkIn: record?.checkInDate,
                checkOut: record?.checkOutDate
            }
        })
    }

    return {
        isLoadingData,
        communities,
        people,
        registering,
        handleCheckIn,
        handleCheckOut,
        definePersonStatus
    }
}