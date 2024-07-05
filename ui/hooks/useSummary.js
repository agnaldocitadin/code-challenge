import { useCallback } from "react"
import { Texts } from "../../infra/constants"

export const useSummary = (selectedCommunity, people, registering) => {

    const notCheckedIn = people.filter(person => {
        const record = registering.find(record => record.person._id == person._id)
        if (!record) {
          return true
        }
        return record.checkOutDate
    }).length
    
    const companyGroup = useCallback(() => registering?.reduce((accumulator, record) => {
        const { person: { companyName }, checkOutDate } = record
        if (!companyName || checkOutDate) {
            return accumulator
        }

        if (accumulator.has(companyName)) {
            accumulator.set(accumulator.get(companyName) + 1)
        }

        accumulator.set(companyName, 1)
        return accumulator
    }, new Map()), [selectedCommunity, registering])

    const companyGroupToString = useCallback(() => Array.from(companyGroup().entries())
        .map((entry) => `${entry[0]} (${entry[1]})`)
        .join(", ") || Texts.NA
    , [companyGroup])

    const peopleInTheEvent = people.length - notCheckedIn

    return {
        notCheckedIn,
        peopleInTheEvent,
        companyGroupStr: companyGroupToString()
    }
}