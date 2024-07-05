import { Registering } from "../registering/registering"

export const hookMethods = () => {

    Meteor.methods({
        insertRegistering(data) {
            Registering.insert({ ...data })
        },

        updateRegistering(id, data) {
            Registering.update({ "person._id": id }, {
                $set: {
                    ...data
                }
            })
        }
    })
}