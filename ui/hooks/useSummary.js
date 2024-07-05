import { useCallback } from "react"

const SHOW_FIRST_N_COMPANIES = 8

export const useSummary = (selectedCommunity, people, registering) => {

    const notCheckedIn = people.filter(person => {
        const record = registering.find(record => record.person._id == person._id)
        if (!record) {
          return true
        }
        return record.checkOutDate
    }).length
    
    const companyGroup = useCallback(() => people?.reduce((accumulator, person) => {
        const { companyName } = person
        if (!companyName) {
            return accumulator
        }

        if (accumulator.has(companyName)) {
            accumulator.set(accumulator.get(companyName) + 1)
        }

        accumulator.set(companyName, 1)
        return accumulator
    }, new Map()), [selectedCommunity, people])

    const companyGroupToString = useCallback(() => Array.from(companyGroup().entries())
        .slice(0, SHOW_FIRST_N_COMPANIES)
        .map((entry) => `${entry[0]} (${entry[1]})`)
        .join(", ")
        .concat("...")
    , [companyGroup])

    const peopleInTheEvent = people.length

    return {
        notCheckedIn,
        peopleInTheEvent,
        companyGroupStr: companyGroupToString()
    }
}